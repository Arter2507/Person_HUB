/** @format */

import React, { useState } from 'react';
import { NotebookPen, Plus, Pencil, Trash2 } from 'lucide-react';
import { Checkbox } from '../../ui/checkbox';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';
import { WIDGET_CLASSES } from './common';
import { useSharedState } from '../../../hooks/useShareState';
import type { NoteItem } from '../../../types/home.type';
import { toast } from 'sonner';

export const QuickNoteWidget = () => {
	const { notes, addNote, deleteNote, toggleNote, editNote } = useSharedState();
	const [inputValue, setInputValue] = useState('');
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editingText, setEditingText] = useState('');

	const handleAddItem = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputValue.trim()) {
			addNote(inputValue.trim());
			setInputValue('');
			toast.success('Note added!');
		}
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
		<div className={cn(WIDGET_CLASSES, 'p-4')}>
			<h3 className='text-lg font-semibold mb-4 flex items-center'>
				<NotebookPen className='mr-2 h-5 w-5 text-primary' /> Quick Notes
			</h3>
			<div className='space-y-3 max-h-48 overflow-y-auto pr-2'>
				{notes.map((note) => (
					<div
						key={note.id}
						className='flex items-center group'>
						<Checkbox
							id={`dashboard-note-${note.id}`}
							checked={note.completed}
							onCheckedChange={() => toggleNote(note.id)}
						/>
						<div className='ml-3 flex-1 min-w-0'>
							{editingId === note.id ? (
								<Input
									type='text'
									value={editingText}
									onChange={(e) => setEditingText(e.target.value)}
									onBlur={() => handleSaveEdit(note.id)}
									onKeyDown={(e) =>
										e.key === 'Enter' && handleSaveEdit(note.id)
									}
									className='w-full bg-transparent h-auto p-0 border-0 border-b border-primary focus-visible:ring-0 rounded-none text-sm'
									autoFocus
								/>
							) : (
								<label
									htmlFor={`dashboard-note-${note.id}`}
									className={`text-sm truncate ${
										note.completed
											? 'line-through text-muted-foreground'
											: 'text-foreground'
									}`}>
									{note.text}
								</label>
							)}
						</div>
						<div className='flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2'>
							<Button
								variant='ghost'
								size='icon'
								className='h-6 w-6'
								onClick={() => handleStartEdit(note)}>
								<Pencil className='h-3 w-3' />
							</Button>
							<Button
								variant='ghost'
								size='icon'
								className='h-6 w-6 text-destructive'
								onClick={() => deleteNote(note.id)}>
								<Trash2 className='h-3 w-3' />
							</Button>
						</div>
					</div>
				))}
			</div>
			<form
				onSubmit={handleAddItem}
				className='mt-4 flex items-center border-t border-border pt-3 gap-2'>
				<Input
					type='text'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder='Add a quick note...'
					className='flex-1 bg-transparent focus-visible:ring-0 border-0 focus:outline-none text-sm h-8 p-0'
				/>
				<Button
					type='submit'
					size='icon'
					className='h-7 w-7 flex-shrink-0'>
					<Plus className='h-4 w-4' />
				</Button>
			</form>
		</div>
	);
};
