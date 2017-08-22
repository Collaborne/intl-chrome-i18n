'use strict';

const ChromeI18n = require('../index.js');

var areIntlLocalesSupported = require('intl-locales-supported');

var localesMyAppSupports = [
	'en',
	'fr'
];

// Apply polyfill if necessary, as per FormatJS documentation https://formatjs.io/guides/runtime-environments/ and https://www.npmjs.com/package/intl
if (global.Intl) {
	if (!areIntlLocalesSupported(localesMyAppSupports)) {
		var IntlPolyfill = require('intl');
		Intl.NumberFormat   = IntlPolyfill.NumberFormat;
		Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
	}
} else {
	global.Intl = require('intl');
}

const chromeI18nFrench = new ChromeI18n('fr', 'en', './sample/locales');
console.log(chromeI18nFrench.getMessage('hello_world'));
console.log(chromeI18nFrench.getMessage('annie_action', { numPhotos: 1000 }));

const chromeI18nEnglish = new ChromeI18n('en', 'en', './sample/locales');
console.log(chromeI18nEnglish.getMessage('annie_action', { numPhotos: 1000 }));