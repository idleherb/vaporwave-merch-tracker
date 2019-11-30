from freezegun import freeze_time

# pylint: disable=import-error
from bandcamp_merch_availability.scraper.spiders.bandcamp_merch_spider import (
    BandcampMerchSpider,
)

# pylint: enable=import-error


NOW = "2019-11-08T20:43:31.123456"


def test_parse_merch_page_html():
    merch_page_html = None
    with open("tests/scraper/spiders/merch_page.html") as f:
        merch_page_html = f.read()

    actual = BandcampMerchSpider.parse_merch_page_html(merch_page_html)
    expected = set(
        [
            "/album/va-10-a-vaporwave-anniversary",
            "/album/midnight-ads",
            "/album/lost-love",
            "/album/flamingo-funk-vol-2",
            "/album/miracle-lounge",
        ]
    )

    assert actual == expected


@freeze_time(NOW)
def test_parse_cassette_page_html_with_remaining():
    album_page_html = None
    with open("tests/scraper/spiders/cassette_page_with_remaining.html") as f:
        album_page_html = f.read()

    actual = [
        item for item in BandcampMerchSpider.parse_album_page_html(album_page_html)
    ]
    expected = [
        {
            "id": 2411970645,
            "price": 40.0,
            "currency": "GBP",
            "imageId": 17811177,
            "label": "My Pet Flamingo",
            "artist": "Various Artists",
            "title": "VA:10 (A Vaporwave Anniversary)",
            "releaseDate": "08 Nov 2019 17:11:51 GMT",
            "remaining": 16,
            "editionOf": 100,
            "timestamp": NOW,
            "url": "https://mypetflamingo.bandcamp.com/album/va-10-a-vaporwave-anniversary",
            "merchType": "Cassette",
        }
    ]

    assert actual == expected


@freeze_time(NOW)
def test_parse_cassette_and_vinyl_page():
    album_page_html = None
    with open("tests/scraper/spiders/cassette_and_vinyl_page.html") as f:
        album_page_html = f.read()

    actual = [
        item for item in BandcampMerchSpider.parse_album_page_html(album_page_html)
    ]
    expected = [
        {
            "artist": "Donor Lens",
            "currency": "GBP",
            "editionOf": None,
            "id": 618059824,
            "imageId": 17886166,
            "label": "My Pet Flamingo",
            "merchType": "Cassette",
            "price": 10.0,
            "releaseDate": "17 Nov 2019 16:20:55 GMT",
            "remaining": 10,
            "timestamp": "2019-11-08T20:43:31.123456",
            "title": "Miracle Lounge มิราเคิล เลานจ์",
            "url": "https://mypetflamingo.bandcamp.com/album/miracle-lounge",
        },
        {
            "artist": "Donor Lens",
            "currency": "GBP",
            "editionOf": None,
            "id": 4288251839,
            "imageId": 17886152,
            "label": "My Pet Flamingo",
            "merchType": "Minidisc",
            "price": 15.0,
            "releaseDate": "17 Nov 2019 16:18:45 GMT",
            "remaining": 1,
            "timestamp": "2019-11-08T20:43:31.123456",
            "title": "Miracle Lounge มิราเคิล เลานจ์",
            "url": "https://mypetflamingo.bandcamp.com/album/miracle-lounge",
        },
        {
            "artist": "Donor Lens",
            "currency": "GBP",
            "editionOf": 300,
            "id": 1672113171,
            "imageId": 17567648,
            "label": "My Pet Flamingo",
            "merchType": "Vinyl",
            "price": 20.0,
            "releaseDate": "11 Oct 2019 14:49:00 GMT",
            "remaining": 126,
            "timestamp": "2019-11-08T20:43:31.123456",
            "title": "Miracle Lounge มิราเคิล เลานจ์",
            "url": "https://mypetflamingo.bandcamp.com/album/miracle-lounge",
        },
        {
            "artist": "Donor Lens",
            "currency": "GBP",
            "editionOf": 100,
            "id": 2099166985,
            "imageId": 17567518,
            "label": "My Pet Flamingo",
            "merchType": "Cassette",
            "price": 10.0,
            "releaseDate": "11 Oct 2019 14:31:34 GMT",
            "remaining": 46,
            "timestamp": "2019-11-08T20:43:31.123456",
            "title": "Miracle Lounge มิราเคิล เลานจ์",
            "url": "https://mypetflamingo.bandcamp.com/album/miracle-lounge",
        },
    ]

    assert actual == expected


@freeze_time(NOW)
def test_parse_vinyl_page_html_with_remaining():
    album_page_html = None
    with open("tests/scraper/spiders/vinyl_page_with_remaining.html") as f:
        album_page_html = f.read()

    actual = [
        item for item in BandcampMerchSpider.parse_album_page_html(album_page_html)
    ]
    expected = [
        {
            "artist": 'My Pet Flamingo',
            "currency": "GBP",
            "editionOf": 300,
            "id": 1929996890,
            "imageId": 17567873,
            "label": "My Pet Flamingo",
            "merchType": "Vinyl",
            "price": 22.0,
            "releaseDate": "11 Oct 2019 15:16:18 GMT",
            "remaining": 20,
            "timestamp": "2019-11-08T20:43:31.123456",
            "title": "Flamingo Funk vol.2",
            "url": "https://mypetflamingo.bandcamp.com/album/flamingo-funk-vol-2",
        },
        {
            "artist": 'My Pet Flamingo',
            "currency": "GBP",
            "editionOf": None,
            "id": 2137530239,
            "imageId": 17568021,
            "label": "My Pet Flamingo",
            "merchType": "Compact Disc (CD)",
            "price": 12.0,
            "releaseDate": "11 Oct 2019 15:34:54 GMT",
            "remaining": None,
            "timestamp": "2019-11-08T20:43:31.123456",
            "title": "Flamingo Funk vol.2",
            "url": "https://mypetflamingo.bandcamp.com/album/flamingo-funk-vol-2",
        },
    ]

    assert actual == expected


@freeze_time(NOW)
def test_parse_floppy_page_html():
    album_page_html = None
    with open("tests/scraper/spiders/floppy_page.html") as f:
        album_page_html = f.read()

    actual = [
        item for item in BandcampMerchSpider.parse_album_page_html(album_page_html)
    ]
    expected = [
        {
            "artist": 'V ▲ P Y D',
            "currency": "CAD",
            "editionOf": 25,
            "id": 3841970121,
            "imageId": 17051339,
            "label": "STRUDELSOFT",
            "merchType": "Floppy",
            "price": 8.0,
            "releaseDate": "25 Jul 2019 15:25:39 GMT",
            "remaining": 12,
            "timestamp": "2019-11-08T20:43:31.123456",
            "title": 'V ▲ P Y D - Virtua City Mall EP 3.5" FLOPPY DISK',
            "url": "https://strudelsoft.bandcamp.com/merch/v-p-y-d-virtua-city-mall-ep-35-floppy-disk",
        }
    ]

    assert actual == expected

