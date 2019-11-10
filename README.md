# Bandcamp Merch Availability

Check bandcamp pages for available merch.

Live app: <http://merch.iwanttorelease.com>

## Scraper

### Setup

    cd scraper
    python3 -m venv venv
    . venv/bin/activate
    (venv) pip install -r requirements.txt

### Run tests

    (venv) pytest -vv

### Run scraper

    (venv) cd src/bandcamp_merch_availability
    (venv) rm -f bandcamp_merch.json
    (venv)  scrapy crawl bandcamp_merch -o bandcamp_merch.json
    (venv) cat bandcamp_merch.json

## Frontend

### Setup

    cd frontend
    npm install

### Run Local Dev Server

    npm run dev-db  # shell 1
    npm start       # shell 2

### Build

    npm build
