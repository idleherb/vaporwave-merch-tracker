import scrapy

from datetime import datetime
from scrapy.selector import Selector

import sys



MERCH_TYPE_CASSETTE = 'Cassette'
MERCH_TYPE_VINYL = 'Record/Vinyl'


class BandcampMerchSpider(scrapy.Spider):
    name = 'bandcamp_merch'
    raw_start_urls = None
    try:
        raw_start_urls = open('labels.txt').read().strip().split('\n')
    except FileNotFoundError:
        raw_start_urls = open('../../labels.txt').read().strip().split('\n')
    start_urls = [url for url in raw_start_urls if not url.startswith('#')]


    def parse(self, response):
        base_url = response.url[:response.url.rfind('/')]
        for album_path in self.parse_merch_page_html(response.body):
            if album_path.startswith('/merch'):
                album_path = album_path[6:]
            album_url = base_url + album_path
            yield scrapy.Request(url=album_url, callback=self.parse_album_page)


    @staticmethod
    def parse_merch_page_html(html):
        release_paths = Selector(text=html).xpath(f'''
            //li[
                (contains(@class,"merch-grid-item")
                    or contains(@class,"featured-item"))
                    and ./div[
                        contains(@class,"merchtype")
                    ]/text()[
                        normalize-space()="{MERCH_TYPE_CASSETTE}"
                            or normalize-space()="{MERCH_TYPE_VINYL}"
                    ]
                    and ./p[
                        contains(@class,"price")
                            and not(contains(@class,"sold-out"))
                    ]
            ]/a[./div[@class="art"]]/@href''').getall()

        return set(release_paths)


    def parse_album_page(self, response):
        return self.parse_album_page_html(response.body)


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
        result_template = {
            'label': label,
            'artist': BandcampMerchSpider.normalize_text(artist),
            'title': BandcampMerchSpider.normalize_text(title),
            'releaseDate': release_date,
            'timestamp': timestamp,
            'url': url,
        }

        raw_items = Selector(text=html) \
            .xpath(f'''
                //li[
                    contains(@class,"buyItem")
                        and contains(@class,"package")
                        and .//button[
                            contains(@class,"order_package_link")
                                and contains(@class,"buy-link")
                        ]/text()[
                            normalize-space()="Buy {MERCH_TYPE_CASSETTE}"
                                or normalize-space()="Buy {MERCH_TYPE_VINYL}"
                        ]
                ]''').getall()

        for raw_item in raw_items:
            item = BandcampMerchSpider.parse_raw_item(raw_item)
            yield {**result_template, **item}


    @staticmethod
    def parse_raw_item(html):
        item = {}
        buy_button_text = Selector(text=html) \
            .xpath('''
                //button[
                    contains(@class,"order_package_link")
                        and contains(@class,"buy-link")
                ]/text()[
                    normalize-space()
                ]''').get()
        merch_type = buy_button_text.strip()[4:]
        item['merchType'] = merch_type

        artwork_url = Selector(text=html) \
            .xpath('''
                //ul[
                    contains(@class,"popupImageGallery")
                        and contains(@class,"gallery_array")
                        and contains(@class,"gallery_viewer")
                ]/li[
                    contains(@class,"gallery_item")
                        and contains(@class,"viewer")
                        and contains(@class,"first")
                ]/a/img/@src
            ''').get()
        item['artworkUrl'] = artwork_url

        remaining = Selector(text=html) \
            .xpath('''
                //span[
                    contains(@class,"notable")
                        and contains(@class,"end")
                ]/text()''') \
            .get()
        if remaining:
            raw_number = (remaining
                .rstrip('remaining')
                .strip())
            item['remaining'] = int(raw_number)

        return item

    
    @staticmethod
    def normalize_text(text):
        return text.strip()
