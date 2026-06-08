import { Column, Object, asString, asArray, asOneOf, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const articleSchema = Object({
	section: Column('section', asOneOf(['Bangkok', 'Pattaya'])),
	title: Column('title', asString()),
	distributors: Column('distributors', asArray(asString())),
	image: Column('image', asString()),
	link: Column('link', asString())
});

export type Article = StaticDecode<typeof articleSchema>;

export const SectionLabel: Record<Article['section'], string> = {
	Bangkok: 'ส.ก. และการเลือกตั้ง กทม.',
	Pattaya: 'Related Content: การเลือกตั้งพัทยา'
};

export const articles = await sheets.get('related_content', articleSchema);
