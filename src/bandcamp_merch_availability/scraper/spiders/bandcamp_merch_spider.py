import scrapy

from datetime import datetime
from scrapy.selector import Selector



MERCH_TYPE_CASSETTE = 'Cassette'


class BandcampMerchSpider(scrapy.Spider):
    name = 'bandcamp_merch'
    raw_start_urls = None
    try:
        raw_start_urls = open('labels.txt').read().strip().split('\n')
    except FileNotFoundError:
        raw_start_urls = open('src/bandcamp_merch_availability/labels.txt').read().strip().split('\n')
    start_urls = [url for url in raw_start_urls if not url.startswith('#')]

    def parse(self, response):
        base_url = response.url[:response.url.rfind('/')]
        for artwork_url, album_path in self.parse_merch_page_html(response.body):
            album_url = base_url + album_path
            print('### 1:', artwork_url, album_path)
            yield scrapy.Request(
                url=album_url,
                callback=(lambda res: self.parse_album_page(artwork_url, res))
            )


    @staticmethod
    def parse_merch_page_html(html):
        anchors = Selector(text=html).xpath(f'''
            //li[
                (contains(@class,"merch-grid-item")
                    or contains(@class,"featured-item"))
                    and ./div[
                        contains(@class,"merchtype")
                    ]/text()[
                        normalize-space()="{MERCH_TYPE_CASSETTE}"
                    ]
                    and ./p[
                        contains(@class,"price")
                            and not(contains(@class,"sold-out"))
                    ]
            ]/a[./div[@class="art"]]''').getall()

        return [BandcampMerchSpider.parse_anchor_html(anchor) for anchor in anchors]


    @staticmethod
    def parse_anchor_html(html):
        artwork_url = Selector(text=html).xpath(f'''
            //div[@class="art"]/img[starts-with(@src,"http")]/@src
        ''').get()
        if not artwork_url:
            artwork_url = Selector(text=html).xpath(f'''
                //div[@class="art"]/img/@data-original
            ''').get()
        release_path = Selector(text=html).xpath(f'''
            //a[./div[@class="art"]]/@href
        ''').get()

        return (artwork_url, release_path)

    def parse_album_page(self, artwork_url, response):
        print('### 2:', artwork_url, response.url)
        yield self.parse_album_page_html(response.body, artwork_url)


    @staticmethod
    def parse_album_page_html(html, artwork_url):
        timestamp = datetime.now().isoformat()
        url = Selector(text=html).xpath('''
            //meta[
                @property="og:url"
            ]/@content''').get()
        label = Selector(text=html).xpath('''
            //meta[
                @property="og:site_name"
            ]/@content''').get()
        artist = Selector(text=html).xpath('''
            //span[
                @itemprop="byArtist"
            ]/a/text()''').get()
        title = Selector(text=html).xpath('''
            //h2[
                @class="trackTitle"
                    and @itemprop="name"
            ]/text()''').get()
        release_date = Selector(text=html).xpath('''
            //meta[
                @itemprop="datePublished"
            ]/@content''').get()
        result = {
            'artworkUrl': artwork_url,
            'label': label,
            'artist': BandcampMerchSpider.normalize_text(artist),
            'title': BandcampMerchSpider.normalize_text(title),
            'releaseDate': release_date,
            'timestamp': timestamp,
            'url': url,
        }

        remaining_cassettes = Selector(text=html) \
            .xpath('''
                //span[
                    contains(@class,"notable")
                        and contains(@class,"end")
                ]/text()''') \
            .get()
        if remaining_cassettes:
            raw_number = (remaining_cassettes
                .rstrip('remaining')
                .strip())
            result['remainingCassettes'] = int(raw_number)

        return result

    
    @staticmethod
    def normalize_text(text):
        return text.strip()
