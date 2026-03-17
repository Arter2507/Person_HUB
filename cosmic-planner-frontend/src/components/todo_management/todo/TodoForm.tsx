/** @format */

import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { toast } from 'sonner';
import type { Todo } from '../../../types/todo.type';
import { useTodoContext } from '../../../hooks/useTodoContext';

const TodoForm: React.FC = () => {
	const { addTodo } = useTodoContext();
	const [text, setText] = useState('');
	const [priority, setPriority] = useState<Todo['priority']>('medium');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!text.trim()) {
			toast.error("Task description can't be empty.");
			return;
		}
		addTodo(text, priority);
		setText('');
		setPriority('medium');
	};

	return (
		<Card>
			<CardContent className='p-4'>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col sm:flex-row items-center gap-2'>
					<Input
						type='text'
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="What's your next cosmic quest?"
						className='flex-grow'
					/>
					<Select
						onValueChange={(value: Todo['priority']) => setPriority(value)}
						value={priority}>
						<SelectTrigger className='w-full sm:w-[120px]'>
							<SelectValue placeholder='Priority' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='low'>Low</SelectItem>
							<SelectItem value='medium'>Medium</SelectItem>
							<SelectItem value='high'>High</SelectItem>
						</SelectContent>
					</Select>
					<Button
						type='submit'
						className='w-full sm:w-auto'>
						<Plus className='h-4 w-4 sm:mr-2' />
						<span className='hidden sm:inline'>Add Task</span>
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default TodoForm;
