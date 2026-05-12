import { Column, Object, asArray, asNumber, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const committeeSchema = Object({
	id: Column('id', asString()),
	title: Column('Commitee_Title', asString()),
	year: Column('year', asNumber()),
	output: Column('Output', asString()),
	committeeOutput: Column('Committee_output_title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString()).optional([])),
	district: Column('District', asString()),
	committeeSuggestion: Column('Commitee_Suggestion', asString().optional()),
	link: Column('url', asString()),
	mentionMotion: Column('mention_motion', asArray(asString()).optional([]))
});

export type Committee = StaticDecode<typeof committeeSchema>;

export const committees = await sheets.get('สามัญ', committeeSchema);
