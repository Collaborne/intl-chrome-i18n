import IntlMessageFormat from 'intl-messageformat';
import * as path from 'path';

interface TranslationEntry {
	message: string;
}
interface Messages {
	[key: string]: TranslationEntry;
}

// tslint:disable no-console max-line-length
export class ChromeI18n {
	private locale: string;
	private defaultLocale: string;
	private messages: Messages | undefined;
	private defaultMessages: Messages;

	constructor(locale: string, defaultLocale: string, pathToLocales: string) {
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
	 * Get a formatted message with the given name
	 */
	public getMessage(messageName: string, content?: object, formats?: object): string {
		const message = this.doGetMessage(messageName);
		return message ? new IntlMessageFormat(message.message, this.locale, formats).format(content) : messageName;
	}

	/**
	 * Get message with given name from the default locale
	 */
	private getDefaultLocaleMessage(messageName: string): TranslationEntry | null {
		if (!this.defaultMessages.hasOwnProperty(messageName)) {
			console.warn(`WARN: No message found with name ${messageName} in default locale ${this.defaultLocale}`);
			return null;
		}
		return this.defaultMessages[messageName];
	}

	/**
	 * Get message with given name
	 */
	private doGetMessage(messageName: string): TranslationEntry | null {
		if (!this.messages || !this.messages.hasOwnProperty(messageName)) {
			console.warn(`No message found with name ${messageName} in locale ${this.locale}. Using default locale '${this.defaultLocale}'`);
			return this.getDefaultLocaleMessage(messageName);
		}
		return this.messages[messageName];
	}
}
