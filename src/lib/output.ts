import { bills } from '$lib/sheets/bill';
import { billCommittees } from '$lib/sheets/bill-committee';
import { committees } from '$lib/sheets/committee';
import { generalCommittees } from '$lib/sheets/general-committee';
import { matchedOutputs } from '$lib/sheets/matched-output';
import { motions } from '$lib/sheets/motion';
import { subjects } from '$lib/sheets/subject';

type OutputEntry = { output: string; ids: string[]; slug: string };

const FNV_OFFSET_BASIS = 14695981039346656037n;
const FNV_PRIME = 1099511628211n;

const linkedEntries: OutputEntry[] = matchedOutputs.map((entry) => {
	const output = entry.output;
	const ids = [
		entry.committeeId1,
		entry.committeeId2,
		entry.billId,
		entry.motionId1,
		entry.motionId2
	].filter((id): id is string => !!id);
	return { output, ids, slug: fnv1a64(output) };
});

const seenIds = new Set(linkedEntries.flatMap((e) => e.ids));
const outputMap = new Map<string, string[]>(linkedEntries.map((e) => [e.output, [...e.ids]]));

mergeUnlinked(subjects);
mergeUnlinked(motions);
mergeUnlinked(generalCommittees);
mergeUnlinked(committees);
mergeUnlinked(billCommittees);
mergeUnlinked(bills);

export const outputs: OutputEntry[] = Array.from(outputMap, ([output, ids]) => ({
	output,
	ids,
	slug: fnv1a64(output)
}));

function mergeUnlinked(items: { id: string; output: string }[]) {
	for (const { id, output } of items) {
		if (!output) continue;
		if (seenIds.has(id)) continue;

		const existing = outputMap.get(output);
		if (existing) {
			existing.push(id);
		} else {
			outputMap.set(output, [id]);
		}
		seenIds.add(id);
	}
}

/**
 * Produces a compact, URL-safe, deterministic hash of a string using
 * the 64-bit FNV-1a algorithm. The result is a base-36 string (~13 chars)
 * suitable for route segments and lookup keys — not for cryptographic use.
 */
function fnv1a64(s: string): string {
	let hash = FNV_OFFSET_BASIS;
	for (let i = 0; i < s.length; i++) {
		hash ^= BigInt(s.charCodeAt(i));
		hash = BigInt.asUintN(64, hash * FNV_PRIME);
	}
	return hash.toString(36);
}
