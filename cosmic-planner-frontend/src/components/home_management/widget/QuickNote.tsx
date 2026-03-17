/** @format */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Input } from '../../ui/input';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { useSharedState } from '../../../hooks/useShareState';
import type { NoteItem } from '../../../types/home.type';

const QuickNote: React.FC = () => {
	const { notes, addNote, deleteNote, toggleNote, editNote } = useSharedState();
	const [inputValue, setInputValue] = useState('');
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editingText, setEditingText] = useState('');

	const handleAddItem = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputValue.trim()) {
			addNote(inputValue.trim());
			setInputValue('');
			toast.success('Note added successfully!');
		} else {
			toast.error('Note cannot be empty.');
		}
	};

	const handleDeleteItem = (id: number) => {
		deleteNote(id);
		toast.info('Note removed.');
	};

	const handleStartEdit = (note: NoteItem) => {
		setEditingId(note.id);
		setEditingText(note.text);
	};

	const handleSaveEdit = (id: number) => {
		if (editingText.trim()) {
			editNote(id, editingText.trim());
			toast.success('Note updated!');
		}
		setEditingId(null);
		setEditingText('');
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Quick Note</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-3 h-32 overflow-y-auto pr-2'>
					{notes.map(
						(note: {
							id: React.Key | null | undefined;
							completed: unknown;
							text:
								| string
								| number
								| bigint
								| boolean
								| React.ReactElement<
										unknown,
										string | React.JSXElementConstructor<unknown>
								  >
								| Iterable<React.ReactNode>
								| React.ReactPortal
								| Promise<
										| string
										| number
										| bigint
										| boolean
										| React.ReactPortal
										| React.ReactElement<
												unknown,
												string | React.JSXElementConstructor<unknown>
										  >
										| Iterable<React.ReactNode>
										| null
										| undefined
								  >
								| null
								| undefined;
						}) => (
							<div
								key={note.id}
								className='flex items-center group'>
								<Checkbox
									checked={Boolean(note.completed)}
									onCheckedChange={() =>
										note.id != null ? toggleNote(note.id as number) : undefined
									}
									id={`home-note-${note.id}`}
									className='flex-shrink-0'
								/>
								<div className='ml-3 flex-1 min-w-0'>
									{editingId === note.id ? (
										<Input
											type='text'
											value={editingText}
											onChange={(e: {
												target: { value: React.SetStateAction<string> };
											}) => setEditingText(e.target.value)}
											onBlur={() =>
												note.id != null
													? handleSaveEdit(note.id as number)
													: undefined
											}
											onKeyDown={(e: { key: string }) =>
												e.key === 'Enter' &&
												note.id != null &&
												handleSaveEdit(note.id as number)
											}
											className='w-full bg-transparent h-auto p-0 border-0 border-b border-primary focus-visible:ring-0 rounded-none'
											autoFocus
										/>
									) : (
										<label
											htmlFor={`home-note-${note.id}`}
											className={`truncate ${
												note.completed
													? 'line-through text-muted-foreground'
													: 'text-foreground/90'
											}`}>
											{note.text}
										</label>
									)}
								</div>
								<div className='flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2'>
									<Button
										variant='ghost'
										size='icon'
										className='h-7 w-7'
										onClick={() =>
											note.id != null
												? handleStartEdit({
														id: note.id as number,
														completed: !!note.completed,
														text:
															typeof note.text === 'string' ? note.text : '',
												  })
												: undefined
										}>
										<Pencil className='h-4 w-4' />
									</Button>
									<Button
										variant='ghost'
										size='icon'
										className='h-7 w-7 text-destructive'
										onClick={() =>
											note.id != null
												? handleDeleteItem(note.id as number)
												: undefined
										}>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>
							</div>
						)
					)}
				</div>
				<form
					onSubmit={handleAddItem}
					className='mt-4 flex items-center border-t border-border pt-3 gap-2'>
					<Input
						type='text'
						value={inputValue}
						onChange={(e: {
							target: { value: React.SetStateAction<string> };
						}) => setInputValue(e.target.value)}
						placeholder='Add a new note...'
						className='flex-1 bg-transparent focus-visible:ring-0 border-0 focus:outline-none text-sm'
					/>
					<Button
						type='submit'
						size='icon'
						className='h-8 w-8 flex-shrink-0'>
						<Plus className='h-4 w-4' />
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default QuickNote;
