# Simple lightweight modal message app

## Overview

Simple lightweight modal message Cloudflare app with with French translation and more options.

## Options

* RichText message
* Add confirmation button
* Add button colorpicker
* Add redirect button
* Add French traductions

## Setup

Fork and clone the repo

Install the dependencies with `yarn install` then build the project with `yarn build` (or `npm run build`).

Next, navigate to [App Creator](https://www.cloudflare.com/apps/developer/app-creator) and upload your project directory.

The App Creator will update automatically on file changes (Chrome only). Once you're done testing, press Create App to submit your app for moderation. Refer to [Terms of Use](https://www.cloudflare.com/apps/developer/docs/resources/terms-of-use) for more information.

## Usage

* `yarn start` (or `npm start`) Sets up your dev environment and runs Webpack in watch mode.
* `yarn build` (or `npm run build`) Lints your project and compiles your JavaScript and CSS once for release.

### Other Interesting Scripts

* `dev:setup` Add other initialization scripts to your development pipeline here.

The project uses [yarn-run-all](https://www.npmjs.com/package/yarn-run-all) which makes it easy to run tasks in series or parallel using `yarn` or `npm`.

#### `install.json`

This is where all the [installer options](https://www.cloudflare.com/apps/developer/docs/install-json) are added for the app.

Use the DNS field to configure [Cloudflare DNS Records](https://api.cloudflare.com/#dns-records-for-a-zone-properties). If you don't want to configure DNS, just delete this field.

#### `src/index.js`

This is where the magic happens. Your app starts here.

#### `src/styles.css`

Write your app styles here.

#### `media/**`

Put your icons, tile images, and screenshots to be used in your Cloudflare Apps page here.

[Download media-templates.sketch](https://github.com/CloudflareApps/MediaTemplates/raw/master/media-templates.sketch)

#### `webpack.config.js`

Simple Webpack 4 config using Babel and CSS Loader. Please refrain from modifying the config to minify your built code.

### Troubleshooting

The Cloudflare [developer documentation](https://www.cloudflare.com/apps/developer/docs/getting-started) for examples and API usage.
