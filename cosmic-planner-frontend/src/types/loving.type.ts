/** @format */
export interface PersonInfo {
	name: string;
	nickname: string;
	dob?: Date;
	avatarUrl: string;
}

export type RelationshipStatus =
	| 'acquaintance'
	| 'friends'
	| 'close_friends'
	| 'crush'
	| 'dating'
	| 'in_love'
	| 'engaged'
	| 'married'
	| 'complicated'
	| 'long_distance'
	| 'break_up'
	| 'divorced'
	| 'single'
	| 'talking_stage'
	| 'ghosted'
	| 'rekindled'
	| 'open_relationship'
	| 'situationship'
	| 'separated'
	| 'widowed';

export interface RelationshipInfo {
	startDate?: Date;
	status: RelationshipStatus;
}

export interface LovingInfoState {
	person1: PersonInfo;
	person2: PersonInfo;
	relationship: RelationshipInfo;
}

export type ZodiacSign =
	| 'Aries'
	| 'Taurus'
	| 'Gemini'
	| 'Cancer'
	| 'Leo'
	| 'Virgo'
	| 'Libra'
	| 'Scorpio'
	| 'Sagittarius'
	| 'Capricorn'
	| 'Aquarius'
	| 'Pisces'
	| 'Unknown';

export interface Memory {
	id: number;
	title: string;
	date: Date;
	description: string;
}

export interface ZodiacSignDisplayProps {
	sign: ZodiacSign;
}

export interface MemoriesProps {
	memories: Memory[];
	onAdd: () => void;
	onEdit: (memory: Memory) => void;
	onDelete: (id: number) => void;
}

export interface MemoryDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (memory: Omit<Memory, 'id'> & { id?: number }) => void;
	memory?: Memory | null;
}

export interface PersonEditDialogProps {
	isOpen: boolean;
	onClose: () => void;
	person: PersonInfo;
	onSave: (updatedPerson: PersonInfo) => void;
	personKey: 'person1' | 'person2';
}

export interface RelationshipEditDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedInfo: LovingInfoState) => void;
	lovingInfo: LovingInfoState;
}
