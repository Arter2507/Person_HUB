/** @format */

import React, { useState, useMemo, useEffect } from 'react';
import { CheckSquare, Home } from 'lucide-react';
import { toast } from 'sonner';
import Confetti from 'react-confetti';
import useWindowSize from '../../hooks/useWindowSize';
import TodoList from '../todo_management/todo/TodoList';
import GamifyDashboard from '../todo_management/widget/GamifyDashboard';
import { TodoProvider } from '../../contexts/TodoProvider';
import { useTodoContext } from '../../hooks/useTodoContext';
import Breadcrumb from '../ui/breadcrumb';

const TodoPageContent: React.FC = () => {
	const { todos } = useTodoContext();
	const { width, height } = useWindowSize();
	const [showConfetti, setShowConfetti] = useState(false);

	// --- Derived State for Gamification ---
	const { totalCount, completionPercentage } = useMemo(() => {
		const completed = todos.filter((t) => t.completed);
		const total = todos.length;
		return {
			completedCount: completed.length,
			totalCount: total,
			completionPercentage:
				total > 0 ? Math.round((completed.length / total) * 100) : 0,
		};
	}, [todos]);

	// --- Effect for 100% Completion ---
	useEffect(() => {
		if (completionPercentage === 100 && totalCount > 0) {
			toast.success('Congratulations, Cosmic Voyager! All tasks completed!');
			setShowConfetti(true);
			const timer = setTimeout(() => setShowConfetti(false), 8000); // Confetti lasts for 8 seconds
			return () => clearTimeout(timer);
		}
	}, [completionPercentage, totalCount]);

	const breadcrumbItems = [
		{ label: 'Home', href: '/', icon: <Home /> },
		{ label: 'Todo List', icon: <CheckSquare /> },
	];

	return (
		<div className='space-y-6'>
			{showConfetti && (
				<Confetti
					width={width}
					height={height}
					recycle={false}
					numberOfPieces={400}
				/>
			)}

			<Breadcrumb items={breadcrumbItems} />

			{/* Main Layout */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Left Column: Task Management */}
				<div className='lg:col-span-2'>
					<TodoList />
				</div>

				{/* Right Column: Gamify Dashboard */}
				<div className='lg:col-span-1'>
					<GamifyDashboard />
				</div>
			</div>
		</div>
	);
};

const TodoPage: React.FC = () => (
	<TodoProvider>
		<TodoPageContent />
	</TodoProvider>
);

export default TodoPage;
