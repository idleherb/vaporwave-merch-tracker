import scrapy

from datetime import datetime
from scrapy.selector import Selector

import json
import re
import sys



MERCH_TYPE_CASSETTE = 'Cassette'
MERCH_TYPE_VINYL = 'Record/Vinyl'
RE_PACKAGES = re.compile(r'^\s*packages:\s*(?P<DATA>.+?),?\s*$', re.MULTILINE)
RE_QUOT = re.compile(r'&quot[^;]*;')
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
        for album_path in self.parse_merch_page_html(response.body):
            if album_path.startswith('/merch'):
                album_path = album_path[6:]
            album_url = base_url + album_path
            yield scrapy.Request(url=album_url, callback=self.parse_album_page)


    @staticmethod
    def parse_merch_page_html(html):
        releases_raw_dirty = Selector(text=html).xpath(f'''
            //ol[
                contains(@class,"merch-grid")
                    and @data-edit-callback="/merch_reorder"
            ]/@data-initial-values''').get()
        releases_raw = RE_QUOT.sub('"', releases_raw_dirty)
        releases = json.loads(releases_raw)
        release_paths = (release['url'] for release in releases if not release['sold_out'] and not release['album_private'])

        return set(release_paths)


    def parse_album_page(self, response):
        return self.parse_album_page_html(response.body.decode('utf-8'))


    @staticmethod
    def parse_album_page_html(html):
        timestamp = datetime.now().isoformat()
        label = Selector(text=html).xpath('''
            //meta[
                @property="og:site_name"
            ]/@content''').get()
        url = Selector(text=html).xpath('''
            //meta[
                @property="og:url"
            ]/@content''').get()
        match = RE_PACKAGES.search(html)
        if match:
            releases_raw = match.group('DATA')
            releases = json.loads(releases_raw)
            for release in releases:
                if release['quantity_available'] == 0:
                    continue
                yield {
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
