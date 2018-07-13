declare module 'intl-chrome-i18n' {
	class ChromeI18n {
		constructor(locale: string, defaultLocale: string, pathToLocales: string);
		getMessage(messageName: string, content?: object, formats?: object): string;
	}
	export = ChromeI18n;
}

