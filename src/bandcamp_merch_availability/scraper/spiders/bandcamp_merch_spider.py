import scrapy

from datetime import datetime
from scrapy.selector import Selector



MERCH_TYPE_CASSETTE = 'Cassette'


class BandcampMerchSpider(scrapy.Spider):
    name = 'bandcamp_merch'
    start_urls = [
        'https://aurawire.xyz/merch',
        'https://dreamcatalogue.bandcamp.com/merch',
    ]


    def parse(self, response):
        base_url = response.url[:response.url.rfind('/')]
        for album_path in self.parse_merch_page_html(response.body):
            album_url = base_url + album_path
            yield scrapy.Request(url=album_url, callback=self.parse_album_page)


    @staticmethod
    def parse_merch_page_html(html):
        return Selector(text=html).xpath(f'''
            //li[
                starts-with(@class,"merch-grid-item")
                    and ./div[
                        starts-with(@class,"merchtype")
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
            'artist': BandcampMerchSpider.normalize_text(artist),
            'title': BandcampMerchSpider.normalize_text(title),
            'release_date': release_date,
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
            result['remaining_cassettes'] = int(raw_number)

        return result

    
    @staticmethod
    def normalize_text(text):
        return text.strip()
