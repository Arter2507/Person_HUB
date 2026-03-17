/** @format */

import { useState, useMemo } from 'react';
import type { Todo } from '../types/todo.type';
import { toast } from 'sonner';

const initialTodos: Todo[] = [
	{
		id: '1',
		text: 'Master React custom hooks',
		completed: true,
		priority: 'high',
		xp: 10,
		coin: 20,
		time_completed: new Date(),
	},
	{
		id: '2',
		text: 'Design the gamification UI',
		completed: false,
		priority: 'medium',
		xp: 10,
		coin: 20,
		time_completed: null,
	},
	{
		id: '3',
		text: 'Integrate Recharts for dashboard',
		completed: false,
		priority: 'high',
		xp: 15,
		coin: 25,
		time_completed: null,
	},
	{
		id: '4',
		text: 'Refactor CSS with Tailwind variants',
		completed: true,
		priority: 'low',
		xp: 5,
		coin: 10,
		time_completed: new Date(),
	},
	{
		id: '5',
		text: 'Add confetti effect for 100% completion',
		completed: false,
		priority: 'medium',
		xp: 10,
		coin: 20,
		time_completed: null,
	},
];

export const useTodos = () => {
	const [todos, setTodos] = useState<Todo[]>(initialTodos);
	const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
	const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
	const [sortBy, setSortBy] = useState<
		'default' | 'priority-desc' | 'priority-asc'
	>('default');

	const addTodo = (text: string, priority: 'low' | 'medium' | 'high') => {
		const newTodo: Todo = {
			id: Date.now().toString(),
			text,
			completed: false,
			priority,
			xp: priority === 'high' ? 15 : priority === 'medium' ? 10 : 5,
			coin: priority === 'high' ? 25 : priority === 'medium' ? 20 : 10,
			time_completed: null,
		};
		setTodos((prev) => [newTodo, ...prev]);
		toast.success('New task added to your cosmic quest!');
	};

	const toggleComplete = (id: string) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id
					? {
							...todo,
							completed: !todo.completed,
							time_completed: !todo.completed ? new Date() : null,
					  }
					: todo
			)
		);
		const task = todos.find((t) => t.id === id);
		if (task && !task.completed) {
			toast.success(`Quest "${task.text}" completed!`, {
				description: `+${task.xp} XP and ${task.coin} coins earned!`,
			});
		}
	};

	const deleteTodo = (id: string) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
		toast.info('Task removed from your quest log.');
	};

	const editTodo = (
		id: string,
		newText: string,
		newPriority: 'low' | 'medium' | 'high'
	) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id
					? { ...todo, text: newText, priority: newPriority }
					: todo
			)
		);
		setEditingTodo(null);
		toast.success('Task has been updated!');
	};

	const clearTodos = () => {
		setTodos([]);
		toast.success('All tasks have been cleared.');
	};

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>, todo: Todo) => {
		e.dataTransfer.setData('todoId', todo.id);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: boolean) => {
		const todoId = e.dataTransfer.getData('todoId');
		const task = todos.find((t) => t.id === todoId);
		if (task && task.completed !== status) {
			toggleComplete(todoId);
		}
	};

	const priorityOrder = { high: 3, medium: 2, low: 1 };

	const processedTodos = useMemo(() => {
		const sorted = [...todos].sort((a, b) => {
			if (sortBy === 'priority-desc') {
				return priorityOrder[b.priority] - priorityOrder[a.priority];
			}
			if (sortBy === 'priority-asc') {
				return priorityOrder[a.priority] - priorityOrder[b.priority];
			}
			return 0; // default order
		});

		if (filter === 'all') return sorted;
		if (filter === 'pending') return sorted.filter((t) => !t.completed);
		if (filter === 'completed') return sorted.filter((t) => t.completed);

		return sorted;
	}, [todos, filter, sortBy]);

	return {
		todos,
		processedTodos,
		editingTodo,
		filter,
		sortBy,
		addTodo,
		toggleComplete,
		deleteTodo,
		editTodo,
		setEditingTodo,
		setFilter,
		setSortBy,
		clearTodos,
		handleDrop,
		handleDragStart,
	};
};
