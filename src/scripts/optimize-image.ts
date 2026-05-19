import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { Column, Object, asString } from 'sheethuahua';
import { sheets } from '$lib/sheets/spreadsheet';

const OUTPUT_DIR = path.resolve('static/images/members');
const MAPPING_PATH = path.resolve('src/lib/sheets/member-images.json');
const IMAGE_WIDTH = 64;
const DELAY_MS = 100;

const memberImageSchema = Object({
	name: Column('Name', asString()),
	imageUrl: Column('image_link', asString().optional())
});

async function ensureDir(dir: string) {
	try {
		await access(dir);
	} catch {
		await mkdir(dir, { recursive: true });
	}
}

function slugify(name: string): string {
	return name.replace(/\s+/g, '-');
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
	console.log('Fetching members from Google Sheets...');
	const members = await sheets.get('bmc_members', memberImageSchema);

	const withImages = members.filter((m) => m.imageUrl);
	console.log(`Found ${members.length} members, ${withImages.length} with images`);

	await ensureDir(OUTPUT_DIR);

	const mapping: Record<string, string> = {};
	let success = 0;
	let skipped = 0;

	for (const member of withImages) {
		const imageUrl = member.imageUrl!;
		const filename = `${slugify(member.name)}.webp`;
		const filepath = path.join(OUTPUT_DIR, filename);
		const publicPath = `/images/members/${filename}`;

		try {
			console.log(`Fetching ${member.name}...`);
			const response = await fetch(imageUrl);

			if (!response.ok) {
				console.error(`Failed to fetch (${response.status}): ${member.name} — ${imageUrl}`);
				skipped++;
				continue;
			}

			const buffer = Buffer.from(await response.arrayBuffer());
			const resized = await sharp(buffer).resize({ width: IMAGE_WIDTH }).webp().toBuffer();

			await writeFile(filepath, resized);
			mapping[member.name] = publicPath;
			success++;
			console.log(`Saved: ${publicPath}`);

			await delay(DELAY_MS);
		} catch (err) {
			console.error(`Error processing ${member.name}:`, err instanceof Error ? err.message : err);
			skipped++;
		}
	}

	await writeFile(MAPPING_PATH, JSON.stringify(mapping, null, '\t') + '\n');
	console.log(`\nDone. ${success} optimized, ${skipped} skipped.`);
	console.log(`Mapping written to ${MAPPING_PATH}`);
}

main().catch((err) => {
	console.error('Script failed:', err);
	process.exit(1);
});
