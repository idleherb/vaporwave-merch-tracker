from freezegun import freeze_time

# pylint: disable=import-error
from bandcamp_merch_availability.scraper.spiders.bandcamp_merch_spider import BandcampMerchSpider
# pylint: enable=import-error


NOW = '2019-11-08T20:43:31.123456'



def test_normalize_text():
    actual = BandcampMerchSpider.normalize_text('  foo\u200b:bar spam\neggs \n\n')
    expected = 'foo\u200b:bar spam\neggs'

    assert actual == expected


def test_parse_merch_page_html():
    merch_page_html = None
    with open('tests/scraper/spiders/merch_page.html') as f:
        merch_page_html = f.read()

    actual_generator = BandcampMerchSpider.parse_merch_page_html(merch_page_html)
    actual = [url for url in actual_generator]
    expected = [
        '/album/va-10-a-vaporwave-anniversary',
        '/album/flamingo-funk-vol-2',
        '/album/miracle-lounge',
    ]

    assert actual == expected


@freeze_time(NOW)
def test_parse_album_page_html():
    album_page_html = None
    with open('tests/scraper/spiders/album_page.html') as f:
        album_page_html = f.read()

    actual = BandcampMerchSpider.parse_album_page_html(album_page_html)
    expected = {
        'artist': 'Donor Lens',
        'title': 'Miracle Lounge มิราเคิล เลานจ์',
        'release_date': '20191012',
        'timestamp': NOW,
        'url': 'https://mypetflamingo.bandcamp.com/album/miracle-lounge'
    }

    assert actual == expected


@freeze_time(NOW)
def test_parse_album_page_html_with_remaining():
    album_page_html = None
    with open('tests/scraper/spiders/album_page_with_remaining.html') as f:
        album_page_html = f.read()

    actual = BandcampMerchSpider.parse_album_page_html(album_page_html)
    expected = {
        'artist': 'Various Artists',
        'title': 'VA\u200b:\u200b10 (A Vaporwave Anniversary)',
        'release_date': '20190719',
        'remaining_cassettes': 16,
        'timestamp': NOW,
        'url': 'https://mypetflamingo.bandcamp.com/album/va-10-a-vaporwave-anniversary'
    }

    assert actual == expected
