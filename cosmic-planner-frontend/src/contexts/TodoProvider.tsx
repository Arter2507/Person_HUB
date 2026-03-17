/** @format */

import React from 'react';
import { TodoContext } from './todo-context';
import { useTodos } from '../hooks/useTodo';

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const todoState = useTodos();

	return (
		<TodoContext.Provider value={todoState}>{children}</TodoContext.Provider>
	);
};
