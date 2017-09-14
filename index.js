'use strict';

const path = require('path');
const IntlMessageFormat = require('intl-messageformat');

module.exports = class ChromeI18n {
	constructor(locale, defaultLocale, pathToLocales) {
		this.locale = locale;
		const pathToMessages = path.join(pathToLocales, `${this.locale}.json`);
		try {
			this.messages = require(pathToMessages);
		} catch (error) {
			console.warn(`WARN: Could not find locale '${locale}' at path ${pathToMessages}. Using default locale '${defaultLocale}'`);
		}

		this.defaultLocale = defaultLocale;
		if (!defaultLocale) {
			throw new Error(`No default locale specified. Please specify a default locale, for example 'en'`);
		}
		const pathToDefaultMessages = path.join(pathToLocales, `${this.defaultLocale}.json`);
		try {
			this.defaultMessages = require(pathToDefaultMessages);
		} catch (error) {
			throw new Error(`No translations available for the default locale '${defaultLocale}' at path ${pathToDefaultMessages}. Default locale must have available translations.`);
		}
	}

	/**
	 * Get message with given name from the default locale
	 * @param {String} messageName
	 */
	_getDefaultLocaleMessage(messageName) {
		if (!this.defaultMessages.hasOwnProperty(messageName)) {
			console.warn(`WARN: No message found with name ${messageName} in default locale ${this.defaultLocale}`);
			return null;
		}
		return this.defaultMessages[messageName];
	}

	/**
	 * Get message with given name
	 * @param {String} messageName
	 */
	_getMessage(messageName) {
		if (!this.messages || !this.messages.hasOwnProperty(messageName)) {
			console.warn(`No message found with name ${messageName} in locale ${this.locale}. Using default locale '${this.defaultLocale}'`);
			return this._getDefaultLocaleMessage(messageName);
		}
		return this.messages[messageName];
	}

	/**
	 * Get a formatted message with the given name
	 * @param {String} messageName
	 * @param {Object} [content]
	 * @param {Object} [formats]
	 */
	getMessage(messageName, content, formats) {
		const message = this._getMessage(messageName);
		return message ? new IntlMessageFormat(message.message, this.locale, formats).format(content) : message;
	}
}
