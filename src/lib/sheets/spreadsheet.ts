import { Spreadsheet, withCache } from 'sheethuahua';

const sheetCache = new Map();

export const sheets = withCache(
	Spreadsheet('1vm2kIqOrKyPjWvlK9GjMAo9mFTcZEK1GSkJ3gM1gNb8'),
	sheetCache
);
