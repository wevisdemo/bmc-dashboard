import { bmcMembers } from './bmc-member';
import memberImageMap from './member-images.json';

export interface Proposer {
	name: string;
	party?: string;
	district?: string;
	imageUrl?: string;
}

const memberByName = new Map(bmcMembers.map((m) => [m.name, m]));

export function resolveProposer(name: string): Proposer | undefined {
	const member = memberByName.get(name);

	return member
		? {
				name: member.name,
				party: member.party,
				district: member.district,
				imageUrl: memberImageMap[name as keyof typeof memberImageMap]
			}
		: undefined;
}
