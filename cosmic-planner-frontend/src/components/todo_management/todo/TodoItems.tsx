/** @format */

import React, { useState } from 'react';
import type { Todo, TodoItemProps } from '../../../types/todo.type';
import { Checkbox } from '../../ui/checkbox';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';
import { Edit, Trash2, Save } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { format } from 'date-fns';
import { useTodoContext } from '../../../hooks/useTodoContext';

const priorityClasses = {
	low: 'bg-green-500/20 text-green-400 border-green-500/30',
	medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
	high: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
	const {
		toggleComplete,
		deleteTodo,
		editTodo,
		editingTodo,
		setEditingTodo,
		handleDragStart,
	} = useTodoContext();

	const [editingText, setEditingText] = useState(todo.text);
	const [editingPriority, setEditingPriority] = useState(todo.priority);

	const isEditing = editingTodo?.id === todo.id;

	const handleStartEdit = () => {
		setEditingTodo(todo);
		setEditingText(todo.text);
		setEditingPriority(todo.priority);
	};

	const handleSaveEdit = () => {
		if (editingText.trim()) {
			editTodo(todo.id, editingText, editingPriority);
		}
		setEditingTodo(null);
	};

	if (isEditing) {
		return (
			<div className='flex items-center gap-2 p-3 bg-accent rounded-lg'>
				<Input
					type='text'
					value={editingText}
					onChange={(e) => setEditingText(e.target.value)}
					className='flex-grow bg-background'
					autoFocus
					onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
				/>
				<Select
					onValueChange={(p: Todo['priority']) => setEditingPriority(p)}
					value={editingPriority}>
					<SelectTrigger className='w-[120px]'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='low'>Low</SelectItem>
						<SelectItem value='medium'>Medium</SelectItem>
						<SelectItem value='high'>High</SelectItem>
					</SelectContent>
				</Select>
				<Button
					size='icon'
					onClick={handleSaveEdit}>
					<Save className='h-4 w-4' />
				</Button>
			</div>
		);
	}

	return (
		<div
			draggable
			onDragStart={(e) => handleDragStart(e, todo)}
			className={cn(
				'flex items-center p-3 group transition-all duration-200 rounded-lg cursor-grab active:cursor-grabbing',
				todo.completed ? 'bg-background/50' : 'hover:bg-accent/50'
			)}>
			<Checkbox
				id={`todo-${todo.id}`}
				checked={todo.completed}
				onCheckedChange={() => toggleComplete(todo.id)}
			/>
			<div className='ml-3 flex-grow'>
				<label
					htmlFor={`todo-${todo.id}`}
					className={cn(
						'font-medium transition-all',
						todo.completed
							? 'line-through text-muted-foreground'
							: 'text-foreground'
					)}>
					{todo.text}
				</label>
				{todo.completed && todo.time_completed && (
					<p className='text-xs text-muted-foreground/80 mt-1'>
						Completed at: {format(todo.time_completed, 'MMM d, yyyy h:mm a')}
					</p>
				)}
			</div>
			<div className='flex items-center gap-2 ml-auto'>
				<span
					className={cn(
						'hidden sm:inline-block text-xs font-semibold px-2 py-1 rounded-full border',
						priorityClasses[todo.priority]
					)}>
					{todo.priority}
				</span>
				<div className='flex items-center opacity-0 group-hover:opacity-100 transition-opacity'>
					<Button
						variant='ghost'
						size='icon'
						className='h-8 w-8'
						onClick={handleStartEdit}>
						<Edit className='h-4 w-4' />
					</Button>
					<Button
						variant='ghost'
						size='icon'
						className='h-8 w-8 text-destructive'
						onClick={() => deleteTodo(todo.id)}>
						<Trash2 className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TodoItem;
