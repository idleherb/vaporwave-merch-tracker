import scrapy

from datetime import datetime
from scrapy.selector import Selector

import html as html_lib
import json
import re
import sys



MERCH_TYPE_CASSETTE = 'Cassette'
MERCH_TYPE_VINYL = 'Record/Vinyl'
RE_DATA_TRALBUM = re.compile(r'data-tralbum="(?P<DATA>.+?)"', re.MULTILINE)
RE_FLOPPY = re.compile(r'floppy', re.IGNORECASE)
RE_MINIDISC = re.compile(r'mini\s*disc', re.IGNORECASE)
RE_VINYL = re.compile(r'\bvinyl\b', re.IGNORECASE)


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
        album_paths = self.parse_merch_page_html(response.body)
        if len(album_paths):
            for album_path in album_paths:
                if album_path.startswith('/merch'):
                    album_path = album_path[6:]
                album_url = base_url + album_path
                yield scrapy.Request(url=album_url, callback=self.parse_album_page)
        else:
            yield scrapy.Request(url=response.url, callback=self.parse_album_page)


    @staticmethod
    def parse_merch_page_html(html):
        anchors = Selector(text=html).xpath(f'''
            //li[
                (contains(@class,"merch-grid-item")
                    or contains(@class,"featured-item"))
                    and ./div[
                        contains(@class,"merchtype")
                    ]
                    and ./p[
                        contains(@class,"price")
                            and not(contains(@class,"sold-out"))
                    ]
            ]/a[./div[@class="art"]]''').getall()

        return set([BandcampMerchSpider.parse_anchor_html(anchor) for anchor in anchors])


    @staticmethod
    def parse_anchor_html(html):
        release_path = Selector(text=html).xpath(f'''
            //a[./div[@class="art"]]/@href
        ''').get()

        return release_path


    def parse_album_page(self, artwork_url, response):
        yield self.parse_album_page_html(response.body, artwork_url)


    def parse_album_page(self, response):
        return self.parse_album_page_html(response.body.decode('utf-8'))


    @staticmethod
    def parse_album_page_html(html):
        def normalized_result(raw_result):
            return {k : html_lib.unescape(v) for k, v in raw_result.items()}

        timestamp = datetime.now().isoformat()
        label = Selector(text=html).xpath('''
            //meta[
                @property="og:site_name"
            ]/@content''').get()
        url = Selector(text=html).xpath('''
            //meta[
                @property="og:url"
            ]/@content''').get()
        match = RE_DATA_TRALBUM.search(html)
        if match:
            data_tralbum_raw = match.group('DATA')
            data_tralbum_raw = data_tralbum_raw.replace('&quot;', '"')
            releases = json.loads(data_tralbum_raw)['packages']
            for release in releases:
                if release['quantity_available'] == 0:
                    continue
                raw_result = {
                    'artist': release['album_artist'] or release['download_artist'],
                    'currency': release['currency'],
                    'editionOf': release['edition_size'],
                    'id': release['id'],
                    'imageId': release['arts'][0]['image_id'],
                    'label': label,
                    'merchType': BandcampMerchSpider.normalize_merch_type(release['type_name'], release['title']),
                    'price': release['price'],
                    'releaseDate': release['new_date'],
                    'remaining': release['quantity_available'],
                    'timestamp': timestamp,
                    'title': release['album_title'] or release['title'],
                    'url': url,
                }
                yield normalized_result(raw_result)


    @staticmethod
    def normalize_merch_type(raw_merch_type, title):
        merch_type = raw_merch_type
        if RE_VINYL.search(raw_merch_type):
            merch_type = 'Vinyl'
        if RE_FLOPPY.search(title):
            merch_type = 'Floppy'
        elif RE_MINIDISC.search(title):
            merch_type = 'Minidisc'

        return merch_type
