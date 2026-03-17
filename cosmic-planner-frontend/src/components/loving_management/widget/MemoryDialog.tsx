/** @format */

import React, { useState, useEffect } from 'react';
import type { MemoryDialogProps } from '../../../types/loving.type';
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
import { Textarea } from '../../ui/textarea';
import { toast } from 'sonner';
import { DatePicker } from '../../ui/date-picker';

const MemoryDialog: React.FC<MemoryDialogProps> = ({
	isOpen,
	onClose,
	onSave,
	memory,
}) => {
	const [title, setTitle] = useState('');
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (isOpen) {
			if (memory) {
				setTitle(memory.title);
				setDate(memory.date);
				setDescription(memory.description);
			} else {
				setTitle('');
				setDate(new Date());
				setDescription('');
			}
		}
	}, [memory, isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim() || !date || !description.trim()) {
			toast.error('All fields are required.');
			return;
		}
		onSave({ id: memory?.id, title, date, description });
		toast.success(`Memory ${memory ? 'updated' : 'added'} successfully!`);
		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{memory ? 'Edit Memory' : 'Add New Memory'}</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className='space-y-4 py-4'>
					<div className='space-y-2'>
						<Label htmlFor='title'>Title</Label>
						<Input
							id='title'
							value={title}
							onChange={(e: {
								target: { value: React.SetStateAction<string> };
							}) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='date'>Date</Label>
						<DatePicker
							date={date}
							onDateChange={setDate}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							id='description'
							value={description}
							onChange={(e: {
								target: { value: React.SetStateAction<string> };
							}) => setDescription(e.target.value)}
							rows={4}
							required
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
						<Button type='submit'>Save</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default MemoryDialog;
