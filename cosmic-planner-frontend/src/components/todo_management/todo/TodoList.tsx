/** @format */

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Trash2 } from 'lucide-react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItems';
import { useTodoContext } from '../../../hooks/useTodoContext';
import { toast } from 'sonner';
import { cn } from '../../../lib/utils';
import { Label } from 'recharts';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';

const TodoListContainer: React.FC<{
	title: string;
	todos: ReturnType<typeof useTodoContext>['todos'];
	dropTargetStatus: boolean;
}> = ({ title, todos, dropTargetStatus }) => {
	const { handleDrop } = useTodoContext();
	const [isDragOver, setIsDragOver] = useState(false);

	return (
		<Card
			onDrop={(e) => {
				handleDrop(e, dropTargetStatus);
				setIsDragOver(false);
			}}
			onDragOver={(e) => {
				e.preventDefault();
				setIsDragOver(true);
			}}
			onDragLeave={() => setIsDragOver(false)}
			className={cn(
				'transition-colors',
				isDragOver && 'bg-accent border-primary border-dashed'
			)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-2'>
					{todos.length > 0 ? (
						todos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
							/>
						))
					) : (
						<p className='text-center text-muted-foreground py-4'>
							{dropTargetStatus
								? 'No completed adventures yet.'
								: 'No pending quests.'}
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

const TodoList: React.FC = () => {
	const {
		todos,
		processedTodos,
		clearTodos,
		filter,
		setFilter,
		sortBy,
		setSortBy,
	} = useTodoContext();

	const handleClearAll = () => {
		toast.warning('Are you sure you want to clear all tasks?', {
			action: {
				label: 'Confirm',
				onClick: () => clearTodos(),
			},
			// FIX: Added an empty onClick handler to the toast's cancel action to satisfy the required Action type.
			cancel: {
				label: 'Cancel',
				onClick: () => {},
			},
			duration: 5000,
		});
	};

	const pendingTodos = useMemo(
		() => processedTodos.filter((t) => !t.completed),
		[processedTodos]
	);
	const completedTodos = useMemo(
		() => processedTodos.filter((t) => t.completed),
		[processedTodos]
	);

	return (
		<div className='space-y-4'>
			<TodoForm />

			<Card>
				<CardContent className='p-4 flex flex-col sm:flex-row items-center gap-4 justify-between'>
					<div className='flex flex-col sm:flex-row items-center gap-4 w-full'>
						<div className='flex items-center gap-2 w-full sm:w-auto'>
							<Label
								className='flex-shrink-0'
								id='filter-status-label'>
								Filter
							</Label>
							<Select
								onValueChange={(value: 'all' | 'pending' | 'completed') =>
									setFilter(value)
								}
								value={filter}>
								<SelectTrigger
									id='filter-status'
									className='w-full sm:w-[120px]'>
									<SelectValue placeholder='Filter by status' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>All</SelectItem>
									<SelectItem value='pending'>Pending</SelectItem>
									<SelectItem value='completed'>Completed</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='flex items-center gap-2 w-full sm:w-auto'>
							<Label className='flex-shrink-0'>Sort</Label>
							<Select
								onValueChange={(
									value: 'default' | 'priority-desc' | 'priority-asc'
								) => setSortBy(value)}
								value={sortBy}>
								<SelectTrigger
									id='sort-priority'
									className='w-full sm:w-[180px]'>
									<SelectValue placeholder='Sort by priority' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='default'>Default</SelectItem>
									<SelectItem value='priority-desc'>
										Priority: High to Low
									</SelectItem>
									<SelectItem value='priority-asc'>
										Priority: Low to High
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className='w-full sm:w-auto sm:ml-auto'>
						{todos.length > 0 && (
							<Button
								variant='ghost'
								size='sm'
								className='text-destructive w-full'
								onClick={handleClearAll}>
								<Trash2 className='h-4 w-4 mr-2' />
								Clear All
							</Button>
						)}
					</div>
				</CardContent>
			</Card>

			<TodoListContainer
				title='Pending Quests'
				todos={pendingTodos}
				dropTargetStatus={false}
			/>
			<TodoListContainer
				title='Completed Adventures'
				todos={completedTodos}
				dropTargetStatus={true}
			/>
		</div>
	);
};

export default TodoList;
