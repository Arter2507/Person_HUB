/** @format */

import { createContext } from 'react';
import type { Todo } from '../types/todo.type';

export interface TodoContextType {
	todos: Todo[];
	processedTodos: Todo[];
	editingTodo: Todo | null;
	filter: 'all' | 'pending' | 'completed';
	sortBy: 'default' | 'priority-desc' | 'priority-asc';
	addTodo: (text: string, priority: 'low' | 'medium' | 'high') => void;
	toggleComplete: (id: string) => void;
	deleteTodo: (id: string) => void;
	editTodo: (
		id: string,
		newText: string,
		newPriority: 'low' | 'medium' | 'high'
	) => void;
	setEditingTodo: (todo: Todo | null) => void;
	clearTodos: () => void;
	handleDrop: (e: React.DragEvent<HTMLDivElement>, status: boolean) => void;
	handleDragStart: (e: React.DragEvent<HTMLDivElement>, todo: Todo) => void;
	setFilter: React.Dispatch<
		React.SetStateAction<'all' | 'pending' | 'completed'>
	>;
	setSortBy: React.Dispatch<
		React.SetStateAction<'default' | 'priority-desc' | 'priority-asc'>
	>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
	undefined
);
