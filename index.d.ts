declare class ChromeI18n {
	constructor(locale: string, defaultLocale: string, pathToLocales: string);
	getMessage(messageName: string, content: object, formats: object): string;
}
declare module 'intl-chrome-i18n' {
	export = ChromeI18n;
}
