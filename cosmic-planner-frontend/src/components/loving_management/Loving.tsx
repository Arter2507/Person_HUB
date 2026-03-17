/** @format */

import React, { useState } from 'react';
import type {
	PersonInfo,
	RelationshipStatus,
	LovingInfoState,
	Memory,
} from '../../types/loving.type';
import {
	calculateAge,
	calculateDays,
	getZodiacSign,
} from '../../utils/lovingUtils';
import ZodiacSignDisplay from '../loving_management/widget/ZodiacSignDisplay';
import Memories from '../loving_management/widget/Memories';
import MemoryDialog from '../loving_management/widget/MemoryDialog';
import PersonEditDialog from '../loving_management/widget/PersonEditDialog';
import RelationshipEditDialog from '../loving_management/widget/RelationshipEditDialog'; // Import new dialog
import {
	Heart,
	Gem,
	Sparkles,
	Pencil,
	Settings,
	Users,
	HeartCrack,
	Phone,
	Ghost,
	Flame,
	ShieldQuestion,
	User,
	Milestone,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { toast } from 'sonner';

const initialLovingData: LovingInfoState = {
	person1: {
		name: 'Starlight',
		nickname: 'Star',
		dob: new Date('1998-05-20'),
		avatarUrl: 'https://i.pravatar.cc/150?u=person1',
	},
	person2: {
		name: 'Nebula',
		nickname: 'Neb',
		dob: new Date('1999-10-30'),
		avatarUrl: 'https://i.pravatar.cc/150?u=person2',
	},
	relationship: { startDate: new Date('2022-02-14'), status: 'dating' },
};

const initialMemories: Memory[] = [
	{
		id: 1,
		title: 'First Stargazing',
		date: new Date('2022-03-15'),
		description: 'Watched the Perseid meteor shower together. It was magical.',
	},
	{
		id: 2,
		title: 'Trip to the Cosmic Cafe',
		date: new Date('2022-06-01'),
		description: 'Tried the Galaxy donuts and Moon cheese platter.',
	},
];

const statusStyles: Record<
	RelationshipStatus,
	{ icon: React.ReactNode; color: string; shadow: string }
> = {
	// Core
	dating: {
		icon: <Heart className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-pink-400',
		shadow: 'drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]',
	},
	in_love: {
		icon: <Heart className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-red-500',
		shadow: 'drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]',
	},
	engaged: {
		icon: <Gem className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-cyan-400',
		shadow: 'drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]',
	},
	married: {
		icon: <Gem className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-amber-400',
		shadow: 'drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]',
	},

	// Positive & Neutral
	acquaintance: {
		icon: <Sparkles className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-purple-400',
		shadow: 'drop-shadow-[0_0_15px_rgba(192,132,252,0.8)]',
	},
	friends: {
		icon: <Users className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-blue-400',
		shadow: 'drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]',
	},
	close_friends: {
		icon: <Users className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-indigo-400',
		shadow: 'drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]',
	},
	crush: {
		icon: <Heart className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-rose-400',
		shadow: 'drop-shadow-[0_0_15px_rgba(251,113,133,0.8)]',
	},
	rekindled: {
		icon: <Flame className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-red-600',
		shadow: 'drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]',
	},
	single: {
		icon: <User className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-green-400',
		shadow: 'drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]',
	},

	// Complicated / In-between
	complicated: {
		icon: <ShieldQuestion className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-orange-400',
		shadow: 'drop-shadow-[0_0_15px_rgba(251,146,60,0.8)]',
	},
	long_distance: {
		icon: <Phone className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-teal-400',
		shadow: 'drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]',
	},
	talking_stage: {
		icon: <Sparkles className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-lime-400',
		shadow: 'drop-shadow-[0_0_15px_rgba(163,230,53,0.8)]',
	},
	situationship: {
		icon: <ShieldQuestion className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-yellow-500',
		shadow: 'drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]',
	},
	open_relationship: {
		icon: <Heart className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-fuchsia-500',
		shadow: 'drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]',
	},

	// Negative / Past
	break_up: {
		icon: <HeartCrack className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-slate-500',
		shadow: 'drop-shadow-[0_0_15px_rgba(100,116,139,0.8)]',
	},
	separated: {
		icon: <HeartCrack className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-stone-500',
		shadow: 'drop-shadow-[0_0_15px_rgba(120,113,108,0.8)]',
	},
	divorced: {
		icon: <HeartCrack className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-gray-600',
		shadow: 'drop-shadow-[0_0_15px_rgba(75,85,99,0.8)]',
	},
	ghosted: {
		icon: <Ghost className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-violet-500',
		shadow: 'drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]',
	},
	widowed: {
		icon: <Milestone className='h-10 w-10 md:h-12 md:w-12' />,
		color: 'text-gray-800 dark:text-gray-300',
		shadow: 'drop-shadow-[0_0_15px_rgba(55,65,81,0.8)]',
	},
};

// --- Page Component ---
const LovingPage: React.FC = () => {
	const [info, setInfo] = useState<LovingInfoState>(initialLovingData);
	const [memories, setMemories] = useState<Memory[]>(initialMemories);

	// State for Dialogs
	const [isMemoryDialogOpen, setMemoryDialogOpen] = useState(false);
	const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
	const [isEditDialogOpen, setEditDialogOpen] = useState(false);
	const [editingPersonKey, setEditingPersonKey] = useState<
		'person1' | 'person2' | null
	>(null);
	const [isRelationshipDialogOpen, setRelationshipDialogOpen] = useState(false);

	// --- Memory Handlers ---
	const handleAddMemory = () => {
		setEditingMemory(null);
		setMemoryDialogOpen(true);
	};
	const handleEditMemory = (memory: Memory) => {
		setEditingMemory(memory);
		setMemoryDialogOpen(true);
	};
	const handleDeleteMemory = (id: number) => {
		setMemories(memories.filter((m) => m.id !== id));
		toast.info('Memory deleted.');
	};
	const handleSaveMemory = (
		memoryData: Omit<Memory, 'id'> & { id?: number }
	) => {
		if (memoryData.id) {
			setMemories(
				memories.map((m) =>
					m.id === memoryData.id ? { ...m, ...memoryData } : m
				)
			);
		} else {
			setMemories([...memories, { ...memoryData, id: Date.now() }]);
		}
	};

	// --- Person Edit Handlers ---
	const handleOpenEditDialog = (personKey: 'person1' | 'person2') => {
		setEditingPersonKey(personKey);
		setEditDialogOpen(true);
	};

	const handleSavePerson = (updatedPerson: PersonInfo) => {
		if (editingPersonKey) {
			setInfo((prev) => ({ ...prev, [editingPersonKey]: updatedPerson }));
		}
	};

	// --- Relationship and Data Handlers ---
	const handleSaveRelationship = (updatedInfo: LovingInfoState) => {
		setInfo(updatedInfo);
	};

	const handleResetData = () => {
		setInfo(initialLovingData);
		setMemories(initialMemories);
		toast.success('All information has been reset to default.');
	};

	const PersonProfile: React.FC<{ person: PersonInfo; onEdit: () => void }> = ({
		person,
		onEdit,
	}) => (
		<div className='flex flex-col items-center text-center space-y-2 p-4 w-48 group relative'>
			<div className='relative'>
				<img
					src={person.avatarUrl || `https://i.pravatar.cc/150?u=default`}
					alt={person.name}
					className='w-32 h-32 rounded-full border-4 border-primary shadow-lg object-cover'
				/>
				<Button
					variant='outline'
					size='icon'
					onClick={onEdit}
					className='absolute bottom-1 right-1 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-background/70 backdrop-blur-sm'>
					<Pencil className='h-4 w-4' />
				</Button>
			</div>
			<h2 className='text-2xl font-bold text-foreground'>
				{person.name || 'Enter Name'}
			</h2>
			<p className='text-md text-primary'>
				{person.nickname ? `(${person.nickname})` : ''}
			</p>
			<div className='flex items-center space-x-2'>
				<span className='text-foreground/80'>
					{person.dob ? `${calculateAge(person.dob)} yrs` : '?? yrs'}
				</span>
				<span className='text-foreground/50'>|</span>
				<ZodiacSignDisplay sign={getZodiacSign(person.dob)} />
			</div>
		</div>
	);

	const currentStatusStyle = statusStyles[info.relationship.status];

	return (
		<div className='w-full flex flex-col items-center p-4 space-y-8'>
			{/* --- Main Display Section --- */}
			<div className='w-full flex flex-col items-center relative'>
				<div className='absolute top-4 right-4 z-10'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								size='icon'>
								<Settings className='h-5 w-5' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem
								onSelect={() => setRelationshipDialogOpen(true)}>
								Edit All Details
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onSelect={handleResetData}
								className='text-destructive focus:text-destructive'>
								Reset Data
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className='w-full flex flex-col md:flex-row items-center justify-around gap-4 md:gap-8'>
					<PersonProfile
						person={info.person1}
						onEdit={() => handleOpenEditDialog('person1')}
					/>

					<div className='relative flex flex-col items-center text-center space-y-2 p-4 flex-shrink-0 order-first md:order-none'>
						<div
							className={`text-6xl lg:text-8xl font-bold ${currentStatusStyle.color} animate-pulse ${currentStatusStyle.shadow}`}>
							{calculateDays(info.relationship.startDate)}
						</div>
						<p className='text-lg text-foreground/80'>days together</p>
						<div
							className={`${currentStatusStyle.color} ${currentStatusStyle.shadow} mt-2`}>
							{currentStatusStyle.icon}
						</div>
					</div>

					<PersonProfile
						person={info.person2}
						onEdit={() => handleOpenEditDialog('person2')}
					/>
				</div>
			</div>

			{/* --- Memories Section --- */}
			<Memories
				memories={memories}
				onAdd={handleAddMemory}
				onEdit={handleEditMemory}
				onDelete={handleDeleteMemory}
			/>

			{/* --- Dialogs --- */}
			<MemoryDialog
				isOpen={isMemoryDialogOpen}
				onClose={() => setMemoryDialogOpen(false)}
				onSave={handleSaveMemory}
				memory={editingMemory}
			/>
			{editingPersonKey && (
				<PersonEditDialog
					isOpen={isEditDialogOpen}
					onClose={() => setEditDialogOpen(false)}
					person={info[editingPersonKey]}
					onSave={handleSavePerson}
					personKey={editingPersonKey}
				/>
			)}
			<RelationshipEditDialog
				isOpen={isRelationshipDialogOpen}
				onClose={() => setRelationshipDialogOpen(false)}
				onSave={handleSaveRelationship}
				lovingInfo={info}
			/>
		</div>
	);
};

export default LovingPage;
