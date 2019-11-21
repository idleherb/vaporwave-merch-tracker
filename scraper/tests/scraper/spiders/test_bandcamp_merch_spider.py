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

    actual = BandcampMerchSpider.parse_merch_page_html(merch_page_html)
    expected = set([
        '/album/va-10-a-vaporwave-anniversary',
        '/album/midnight-ads',
        '/album/lost-love',
        '/album/flamingo-funk-vol-2',
        '/album/miracle-lounge',
    ])

    assert actual == expected


@freeze_time(NOW)
def test_parse_cassette_page_html_with_remaining():
    album_page_html = None
    with open('tests/scraper/spiders/cassette_page_with_remaining.html') as f:
        album_page_html = f.read()

    actual = [item for item in BandcampMerchSpider.parse_album_page_html(album_page_html)]
    expected = [{
        'artworkUrl': 'https://f4.bcbits.com/img/0017811177_38.jpg',
        'label': 'My Pet Flamingo',
        'artist': 'Various Artists',
        'title': 'VA\u200b:\u200b10 (A Vaporwave Anniversary)',
        'releaseDate': '20190719',
        'remaining': 16,
        'timestamp': NOW,
        'url': 'https://mypetflamingo.bandcamp.com/album/va-10-a-vaporwave-anniversary',
        'merchType': 'Cassette',
    }]

    assert actual == expected


@freeze_time(NOW)
def test_parse_cassette_and_vinyl_page():
    album_page_html = None
    with open('tests/scraper/spiders/cassette_and_vinyl_page.html') as f:
        album_page_html = f.read()
    
    actual = [item for item in BandcampMerchSpider.parse_album_page_html(album_page_html)]
    expected = [
        {
            'artworkUrl': 'https://f4.bcbits.com/img/0017886166_38.jpg',
            'label': 'My Pet Flamingo',
            'artist': 'Donor Lens',
            'title': 'Miracle Lounge มิราเคิล เลานจ์',
            'releaseDate': '20191012',
            'timestamp': NOW,
            'url': 'https://mypetflamingo.bandcamp.com/album/miracle-lounge',
            'merchType': 'Cassette',
        },
        {
            'artworkUrl': 'https://f4.bcbits.com/img/0017886152_38.jpg',
            'label': 'My Pet Flamingo',
            'artist': 'Donor Lens',
            'title': 'Miracle Lounge มิราเคิล เลานจ์',
            'releaseDate': '20191012',
            'timestamp': NOW,
            'remaining': 1,
            'url': 'https://mypetflamingo.bandcamp.com/album/miracle-lounge',
            'merchType': 'Cassette',
        },
        {
            'artworkUrl': 'https://f4.bcbits.com/img/0017567648_38.jpg',
            'label': 'My Pet Flamingo',
            'artist': 'Donor Lens',
            'title': 'Miracle Lounge มิราเคิล เลานจ์',
            'releaseDate': '20191012',
            'timestamp': NOW,
            'url': 'https://mypetflamingo.bandcamp.com/album/miracle-lounge',
            'merchType': 'Record/Vinyl',
        },
        {
            'artworkUrl': 'https://f4.bcbits.com/img/0017567518_38.jpg',
            'label': 'My Pet Flamingo',
            'artist': 'Donor Lens',
            'title': 'Miracle Lounge มิราเคิล เลานจ์',
            'releaseDate': '20191012',
            'timestamp': NOW,
            'url': 'https://mypetflamingo.bandcamp.com/album/miracle-lounge',
            'merchType': 'Cassette',
        },
    ]

    assert actual == expected


@freeze_time(NOW)
def test_parse_vinyl_page_html_with_remaining():
    album_page_html = None
    with open('tests/scraper/spiders/vinyl_page_with_remaining.html') as f:
        album_page_html = f.read()

    actual = [item for item in BandcampMerchSpider.parse_album_page_html(album_page_html)]
    expected = [{
        'artworkUrl': 'https://f4.bcbits.com/img/0017567873_38.jpg',
        'label': 'My Pet Flamingo',
        'artist': 'My Pet Flamingo',
        'title': 'Flamingo Funk vol\u200b.\u200b2',
        'releaseDate': '20190929',
        'remaining': 20,
        'timestamp': NOW,
        'url': 'https://mypetflamingo.bandcamp.com/album/flamingo-funk-vol-2',
        'merchType': 'Record/Vinyl',
    }]

    assert actual == expected
