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
        ('https://f4.bcbits.com/img/0017811177_37.jpg', '/album/va-10-a-vaporwave-anniversary'),
        ('https://f4.bcbits.com/img/0017567976_37.jpg', '/album/flamingo-funk-vol-2'),
        ('https://f4.bcbits.com/img/0017567518_37.jpg', '/album/miracle-lounge'),
    ]

    assert actual == expected


@freeze_time(NOW)
def test_parse_album_page_html():
    album_page_html = None
    with open('tests/scraper/spiders/album_page.html') as f:
        album_page_html = f.read()
    artwork_url = 'foo'

    actual = BandcampMerchSpider.parse_album_page_html(album_page_html, artwork_url)
    expected = {
        'artwork_url': artwork_url,
        'label': 'My Pet Flamingo',
        'artist': 'Donor Lens',
        'title': 'Miracle Lounge มิราเคิล เลานจ์',
        'releaseDate': '20191012',
        'timestamp': NOW,
        'url': 'https://mypetflamingo.bandcamp.com/album/miracle-lounge'
    }

    assert actual == expected


@freeze_time(NOW)
def test_parse_album_page_html_with_remaining():
    album_page_html = None
    with open('tests/scraper/spiders/album_page_with_remaining.html') as f:
        album_page_html = f.read()
    artwork_url = 'foo'

    actual = BandcampMerchSpider.parse_album_page_html(album_page_html, artwork_url)
    expected = {
        'artwork_url': artwork_url,
        'label': 'My Pet Flamingo',
        'artist': 'Various Artists',
        'title': 'VA\u200b:\u200b10 (A Vaporwave Anniversary)',
        'releaseDate': '20190719',
        'remainingCassettes': 16,
        'timestamp': NOW,
        'url': 'https://mypetflamingo.bandcamp.com/album/va-10-a-vaporwave-anniversary'
    }

    assert actual == expected
