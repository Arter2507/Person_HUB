/** @format */

import React, { useState, useEffect } from 'react';
import type {
	LovingInfoState,
	PersonInfo,
	RelationshipEditDialogProps,
	RelationshipStatus,
} from '../../../types/loving.type';
import { Button } from '../../ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { DatePicker } from '../../ui/date-picker';
import { toast } from 'sonner';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';
import {
	Heart,
	Users,
	Gem,
	Sparkles,
	HeartCrack,
	Phone,
	Ghost,
	Flame,
	ShieldQuestion,
	User,
	Milestone,
} from 'lucide-react';

// FIX: The .sort() method on a string literal array returns `string[]`. Cast the result back to `RelationshipStatus[]` to match the variable type.
const relationshipStatuses: RelationshipStatus[] = [
	'acquaintance',
	'friends',
	'close_friends',
	'crush',
	'talking_stage',
	'dating',
	'in_love',
	'long_distance',
	'open_relationship',
	'situationship',
	'complicated',
	'engaged',
	'married',
	'rekindled',
	'break_up',
	'separated',
	'divorced',
	'widowed',
	'ghosted',
	'single',
].sort() as RelationshipStatus[]; // Sort alphabetically for easier selection

const statusDisplayNames: Record<RelationshipStatus, string> = {
	acquaintance: 'Acquaintance',
	friends: 'Friends',
	close_friends: 'Close Friends',
	crush: 'Crush',
	dating: 'Dating',
	in_love: 'In Love',
	engaged: 'Engaged',
	married: 'Married',
	complicated: "It's Complicated",
	long_distance: 'Long Distance',
	break_up: 'Break Up',
	divorced: 'Divorced',
	single: 'Single',
	talking_stage: 'Talking Stage',
	ghosted: 'Ghosted',
	rekindled: 'Rekindled',
	open_relationship: 'Open Relationship',
	situationship: 'Situationship',
	separated: 'Separated',
	widowed: 'Widowed',
};

// Define styles and icons for all relationship statuses
const statusStyles: Record<
	RelationshipStatus,
	{ icon: React.ReactNode; color: string; shadow: string }
> = {
	// Core
	dating: {
		icon: <Heart className='h-8 w-8' />,
		color: 'text-pink-400',
		shadow: 'drop-shadow-[0_0_10px_rgba(244,114,182,0.7)]',
	},
	in_love: {
		icon: <Heart className='h-8 w-8' />,
		color: 'text-red-500',
		shadow: 'drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]',
	},
	engaged: {
		icon: <Gem className='h-8 w-8' />,
		color: 'text-cyan-400',
		shadow: 'drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]',
	},
	married: {
		icon: <Gem className='h-8 w-8' />,
		color: 'text-amber-400',
		shadow: 'drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]',
	},

	// Positive & Neutral
	acquaintance: {
		icon: <Sparkles className='h-8 w-8' />,
		color: 'text-purple-400',
		shadow: 'drop-shadow-[0_0_10px_rgba(192,132,252,0.7)]',
	},
	friends: {
		icon: <Users className='h-8 w-8' />,
		color: 'text-blue-400',
		shadow: 'drop-shadow-[0_0_10px_rgba(96,165,250,0.7)]',
	},
	close_friends: {
		icon: <Users className='h-8 w-8' />,
		color: 'text-indigo-400',
		shadow: 'drop-shadow-[0_0_10px_rgba(129,140,248,0.7)]',
	},
	crush: {
		icon: <Heart className='h-8 w-8' />,
		color: 'text-rose-400',
		shadow: 'drop-shadow-[0_0_10px_rgba(251,113,133,0.7)]',
	},
	rekindled: {
		icon: <Flame className='h-8 w-8' />,
		color: 'text-red-600',
		shadow: 'drop-shadow-[0_0_10px_rgba(220,38,38,0.7)]',
	},
	single: {
		icon: <User className='h-8 w-8' />,
		color: 'text-green-400',
		shadow: 'drop-shadow-[0_0_10px_rgba(74,222,128,0.7)]',
	},

	// Complicated / In-between
	complicated: {
		icon: <ShieldQuestion className='h-8 w-8' />,
		color: 'text-orange-400',
		shadow: 'drop-shadow-[0_0_10px_rgba(251,146,60,0.7)]',
	},
	long_distance: {
		icon: <Phone className='h-8 w-8' />,
		color: 'text-teal-400',
		shadow: 'drop-shadow-[0_0_10px_rgba(45,212,191,0.7)]',
	},
	talking_stage: {
		icon: <Sparkles className='h-8 w-8' />,
		color: 'text-lime-400',
		shadow: 'drop-shadow-[0_0_10px_rgba(163,230,53,0.7)]',
	},
	situationship: {
		icon: <ShieldQuestion className='h-8 w-8' />,
		color: 'text-yellow-500',
		shadow: 'drop-shadow-[0_0_10px_rgba(234,179,8,0.7)]',
	},
	open_relationship: {
		icon: <Heart className='h-8 w-8' />,
		color: 'text-fuchsia-500',
		shadow: 'drop-shadow-[0_0_10px_rgba(217,70,239,0.7)]',
	},

	// Negative / Past
	break_up: {
		icon: <HeartCrack className='h-8 w-8' />,
		color: 'text-slate-500',
		shadow: 'drop-shadow-[0_0_10px_rgba(100,116,139,0.7)]',
	},
	separated: {
		icon: <HeartCrack className='h-8 w-8' />,
		color: 'text-stone-500',
		shadow: 'drop-shadow-[0_0_10px_rgba(120,113,108,0.7)]',
	},
	divorced: {
		icon: <HeartCrack className='h-8 w-8' />,
		color: 'text-gray-600',
		shadow: 'drop-shadow-[0_0_10px_rgba(75,85,99,0.7)]',
	},
	ghosted: {
		icon: <Ghost className='h-8 w-8' />,
		color: 'text-violet-500',
		shadow: 'drop-shadow-[0_0_10px_rgba(139,92,246,0.7)]',
	},
	widowed: {
		icon: <Milestone className='h-8 w-8' />,
		color: 'text-gray-800 dark:text-gray-300',
		shadow: 'drop-shadow-[0_0_10px_rgba(55,65,81,0.7)]',
	},
};

const PersonFields: React.FC<{
	person: PersonInfo;
	personKey: 'person1' | 'person2';
	onChange: (field: keyof PersonInfo, value: unknown) => void;
}> = ({ person, personKey, onChange }) => (
	<div className='space-y-4'>
		<div className='space-y-2'>
			<Label htmlFor={`name-${personKey}`}>Name</Label>
			<Input
				id={`name-${personKey}`}
				value={person.name}
				onChange={(e) => onChange('name', e.target.value)}
			/>
		</div>
		<div className='space-y-2'>
			<Label htmlFor={`nickname-${personKey}`}>Nickname</Label>
			<Input
				id={`nickname-${personKey}`}
				value={person.nickname}
				onChange={(e) => onChange('nickname', e.target.value)}
			/>
		</div>
		<div className='space-y-2'>
			<Label htmlFor={`dob-${personKey}`}>Date of Birth</Label>
			<DatePicker
				date={person.dob}
				onDateChange={(date) => onChange('dob', date)}
			/>
		</div>
		<div className='space-y-2'>
			<Label htmlFor={`avatarUrl-${personKey}`}>Avatar URL</Label>
			<Input
				id={`avatarUrl-${personKey}`}
				value={person.avatarUrl}
				onChange={(e) => onChange('avatarUrl', e.target.value)}
			/>
		</div>
	</div>
);

const RelationshipEditDialog: React.FC<RelationshipEditDialogProps> = ({
	isOpen,
	onClose,
	onSave,
	lovingInfo,
}) => {
	const [formData, setFormData] = useState<LovingInfoState>(lovingInfo);

	useEffect(() => {
		if (isOpen) {
			setFormData(lovingInfo);
		}
	}, [lovingInfo, isOpen]);

	const handlePersonChange = (
		personKey: 'person1' | 'person2',
		field: keyof PersonInfo,
		value: unknown
	) => {
		setFormData((prev) => ({
			...prev,
			[personKey]: { ...prev[personKey], [field]: value },
		}));
	};

	const handleRelationshipChange = (
		field: keyof LovingInfoState['relationship'],
		value: unknown
	) => {
		setFormData((prev) => ({
			...prev,
			relationship: { ...prev.relationship, [field]: value },
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.person1.name.trim() || !formData.person2.name.trim()) {
			toast.error('Person names cannot be empty.');
			return;
		}
		onSave(formData);
		toast.success('Information updated!');
		onClose();
	};

	const currentStatusStyle = statusStyles[formData.relationship.status];

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}>
			<DialogContent className='sm:max-w-4xl max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='flex items-center'>
						<Heart className='mr-2 h-5 w-5 text-primary' />
						Edit Relationship Details
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className='py-4'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{/* Person 1 */}
						<div className='space-y-4 p-4 border rounded-lg'>
							<h3 className='font-semibold flex items-center'>
								<Users className='mr-2 h-4 w-4' />
								Person 1
							</h3>
							<PersonFields
								person={formData.person1}
								personKey='person1'
								onChange={(field, value) =>
									handlePersonChange('person1', field, value)
								}
							/>
						</div>

						{/* Relationship */}
						<div className='space-y-4 p-4 border rounded-lg flex flex-col'>
							<h3 className='font-semibold flex items-center'>
								<Heart className='mr-2 h-4 w-4' />
								Relationship
							</h3>
							<div className='space-y-2'>
								<Label>Start Date</Label>
								<DatePicker
									date={formData.relationship.startDate}
									onDateChange={(date) =>
										handleRelationshipChange('startDate', date)
									}
								/>
							</div>
							<div className='space-y-2'>
								<Label>Status</Label>
								<Select
									onValueChange={(value: RelationshipStatus) =>
										handleRelationshipChange('status', value)
									}
									value={formData.relationship.status}>
									<SelectTrigger>
										<SelectValue placeholder='Select status' />
									</SelectTrigger>
									<SelectContent className='max-h-60 overflow-y-auto'>
										{relationshipStatuses.map((status) => (
											<SelectItem
												key={status}
												value={status}>
												{statusDisplayNames[status]}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							{/* Icon Preview */}
							<div className='flex-grow flex items-center justify-center pt-6'>
								<div
									className={`${currentStatusStyle.color} ${currentStatusStyle.shadow}`}>
									{currentStatusStyle.icon}
								</div>
							</div>
						</div>

						{/* Person 2 */}
						<div className='space-y-4 p-4 border rounded-lg'>
							<h3 className='font-semibold flex items-center'>
								<Users className='mr-2 h-4 w-4' />
								Person 2
							</h3>
							<PersonFields
								person={formData.person2}
								personKey='person2'
								onChange={(field, value) =>
									handlePersonChange('person2', field, value)
								}
							/>
						</div>
					</div>

					<DialogFooter className='mt-6'>
						<DialogClose asChild>
							<Button
								type='button'
								variant='secondary'>
								Cancel
							</Button>
						</DialogClose>
						<Button type='submit'>Save Changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default RelationshipEditDialog;
