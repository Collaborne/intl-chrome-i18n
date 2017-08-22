'use strict';

const path = require('path');
const IntlMessageFormat = require('intl-messageformat');

module.exports = class ChromeI18n {

	constructor(locale, defaultLocale, pathToLocales) {
		this.locale = locale;
		this.defaultLocale = defaultLocale;

		const pathToTranslations = path.join(__dirname, pathToLocales, `${this.locale}.json`);
		this.messages = require(pathToTranslations);
	}

	/**
	 * Get message with given name
	 * @param {String} messageName
	 */
	_getMessage(messageName) {
		return this.messages[messageName] ? this.messages[messageName].message : null;
	}

	/**
	 * Get a formatted message with the given name
	 * @param {String} messageName
	 * @param {Object} [content]
	 * @param {Object} [formats]
	 */
	getMessage(messageName, content, formats) {
		const message = this._getMessage(messageName);
		if (!message) {
			console.warn(`No message found with name ${messageName}`);
			return message;
		}
		return new IntlMessageFormat(message, this.locale, formats).format(content);
	}
}