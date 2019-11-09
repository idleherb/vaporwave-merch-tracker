import scrapy

from datetime import datetime
from scrapy.selector import Selector



MERCH_TYPE_CASSETTE = 'Cassette'


class BandcampMerchSpider(scrapy.Spider):
    name = 'bandcamp_merch'
    raw_start_urls = None
    try:
        raw_start_urls = open('labels.txt').read().strip('\n').split()
    except FileNotFoundError:
        raw_start_urls = open('src/bandcamp_merch_availability/labels.txt').read().strip('\n').split()
    start_urls = [url for url in raw_start_urls if not url.startswith('#')]

    def parse(self, response):
        base_url = response.url[:response.url.rfind('/')]
        for album_path in self.parse_merch_page_html(response.body):
            album_url = base_url + album_path
            yield scrapy.Request(url=album_url, callback=self.parse_album_page)


    @staticmethod
    def parse_merch_page_html(html):
        return Selector(text=html).xpath(f'''
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
            ]/a[./div[@class="art"]]/@href''').getall()


    def parse_album_page(self, response):
        yield self.parse_album_page_html(response.body)


    @staticmethod
    def parse_album_page_html(html):
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
