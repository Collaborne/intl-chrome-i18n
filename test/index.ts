import { expect } from 'chai';
import 'mocha';
import * as path from 'path';

import { ChromeI18n } from '../src';

const PATH_TO_LOCALES = path.join(__dirname, 'locales');

function createChromeI18n(locale: string): ChromeI18n {
	return new ChromeI18n('fr', 'en', PATH_TO_LOCALES);
}

describe('ChromeI18n', () => {
	it('localizes keys', () => {
		expect(createChromeI18n('fr').getMessage('annie_action', { numPhotos: 1000 }), '');
	});

	it('returns same message in default locale', () => {
		expect(createChromeI18n('en').getMessage('annie_action', { numPhotos: 1000 }), '');
	});

	it('returns default message for unknown locale', () => {
		expect(createChromeI18n('it').getMessage('annie_action', { numPhotos: 1000 }), '');
	});
});
