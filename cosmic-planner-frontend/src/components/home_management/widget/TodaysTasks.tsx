/** @format */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Checkbox } from '../../ui/checkbox';
import type { Task } from '../../../types/home.type';

const mockTasks: Task[] = [
	{ id: 1, text: 'Review Chapter 5 of Quantum Physics', completed: false },
	{
		id: 2,
		text: 'Sketch initial concepts for Cosmic Art project',
		completed: true,
	},
	{ id: 3, text: 'Work on Astrobiology research paper', completed: false },
	{
		id: 4,
		text: 'Team meeting for Rocket Propulsion project',
		completed: false,
	},
];

const TodaysTasks: React.FC = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Today's Tasks</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className='space-y-3 h-32 overflow-y-auto'>
					{mockTasks.map((task) => (
						<li
							key={task.id}
							className='flex items-center'>
							<Checkbox
								id={`task-${task.id}`}
								defaultChecked={task.completed}
							/>
							<label
								htmlFor={`task-${task.id}`}
								className={`ml-3 text-text/90 ${
									task.completed ? 'line-through text-muted-foreground' : ''
								}`}>
								{task.text}
							</label>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};

export default TodaysTasks;
