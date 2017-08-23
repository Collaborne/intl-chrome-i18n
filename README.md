# intl-chrome-i18n [![Build Status](https://travis-ci.org/Collaborne/intl-chrome-i18n.svg?branch=master)](https://travis-ci.org/Collaborne/intl-chrome-i18n)

[![Greenkeeper badge](https://badges.greenkeeper.io/Collaborne/intl-chrome-i18n.svg)](https://greenkeeper.io/)

Provides internationalization functionalities based on Chrome.i18n, and formats the localized message strings with number, date, plural, and select placeholders.

## Summary
This package enables internationalization in the format provided by [Chrome](https://developer.chrome.com/extensions/i18n), and provides formatting support for dates, numbers, plurals and so on, according to the specifications provided by [FormatJS](https://formatjs.io/).

The localized messages should be saved in a dedicated `locales` folder (it can be anywhere in your path, you can just provide it to this module on initialization), one file per locale (e.g. `en.json` and `fr.json`), in the JSON format specified by `chrome.i18n`.

```JSON
{
	"hello_world": {
		"message": "Hello, world!",
		"description": "Greetings message"
	}
}
```

## Get Started

### Intl.js polyfill
This module depends on `intl` to be available in your node environment. Both the [intl documentation](https://www.npmjs.com/package/intl) and the [formatJS documentation](https://formatjs.io/guides/runtime-environments/) provide tutorials on how to set it up correctly.

In case `intl` is not set up correctly, since most Node environments only support the english language, the formatting of strings will be defaulted to English.

### Usage
After making sure that the polyfill is correctly installed, this module can be set up to the desired locale, and used to get internationalized messages:

```
const chromeI18n = new ChromeI18n('en', 'en', './sample/locales');
chromeI18n.getMessage('hello_world');

$ Hello, world!
```

It allows to format messages based on the conventions of the chosen locale. For example, in English we would see the following message:

```
const chromeI18n = new ChromeI18n('en', 'en', './sample/locales');
chromeI18.getMessage('annie_action', { numPhotos: 1000 });

$ Annie took 1,000 photos.
```

While in french, the number is formatted differently:

```
const chromeI18n = new ChromeI18n('fr', 'en', './sample/locales');
chromeI18.getMessage('annie_action', { numPhotos: 1000 });

$ Annie a pris 1 000 photographies.
```

### Sample
For more details on usage, or to see it in action, refer to the [sample code](./sample).

You can run the sample with `npm run sample`.
