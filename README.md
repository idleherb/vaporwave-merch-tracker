# Vaporwave Merch Tracker

Track vaporwave music labels for available merch.

Live app: http://merch.iwanttorelease.com

## Pre-requisites

[Node.js 16](https://nodejs.org/en/download/) installed.

## Setup

    npm install

## test

    npm run test

## Run Local Dev Server

    npm run dev-db  # shell 1
    npm start       # shell 2

## Build

    npm build

## Remarks

After a recent dependency update, the tests wouldn't run anymore.
The testing script in package.json now has 3 flags added to it to make the tests runnable,
here's what they mean and why they were necessary:

`--transformIgnorePatterns "node_modules/(?!@toolz/allow-react)/" --env=jsdom: ` https://dev.to/bytebodger/how-i-fixed-the-unexpected-token-error-in-jest-4o1j

`--resetMocks false`: https://github.com/facebook/jest/issues/9131#issuecomment-668790615
