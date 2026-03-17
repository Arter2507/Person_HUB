/** @format */

export interface Todo {
	id: string;
	text: string;
	completed: boolean;
	priority: 'low' | 'medium' | 'high';
	xp: number;
	coin: number;
	time_completed: Date | null;
}

export interface TodoItemProps {
	todo: Todo;
}

export interface TodoListProps {
	title: string;
	todos: Todo[];
	dropTargetStatus: boolean;
}
