/** @format */

import React, { useState, useEffect } from 'react';
import type {
	PersonEditDialogProps,
	PersonInfo,
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
import { User } from 'lucide-react';

const PersonEditDialog: React.FC<PersonEditDialogProps> = ({
	isOpen,
	onClose,
	person,
	onSave,
	personKey,
}) => {
	const [formData, setFormData] = useState<PersonInfo>(person);

	useEffect(() => {
		if (isOpen) {
			setFormData(person);
		}
	}, [person, isOpen]);

	const handleChange = <K extends keyof PersonInfo>(
		field: K,
		value: PersonInfo[K]
	) => {
		setFormData((prev: PersonInfo) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name.trim()) {
			toast.error('Name cannot be empty.');
			return;
		}
		onSave(formData);
		toast.success(
			`Information for Person ${personKey === 'person1' ? '1' : '2'} updated!`
		);
		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='flex items-center'>
						<User className='mr-2 h-5 w-5' />
						Edit Information for Person {personKey === 'person1' ? '1' : '2'}
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className='space-y-4 py-4'>
					<div className='space-y-2'>
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							value={formData.name}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('name', e.target.value)
							}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='nickname'>Nickname</Label>
						<Input
							id='nickname'
							value={formData.nickname}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('nickname', e.target.value)
							}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='dob'>Date of Birth</Label>
						<DatePicker
							date={formData.dob}
							onDateChange={(date: Date | undefined) =>
								handleChange('dob', date)
							}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='avatarUrl'>Avatar URL</Label>
						<Input
							id='avatarUrl'
							value={formData.avatarUrl}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('avatarUrl', e.target.value)
							}
						/>
					</div>
					<DialogFooter>
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

export default PersonEditDialog;
