/** @format */

import React from 'react';
import QuickNote from './widget/QuickNote';
import TodaysTasks from './widget/TodaysTasks';
import SubjectsGallery from './widget/SubjectsGallery';
import { Button } from '../ui/button';
import { Link } from 'react-router';
import { Rocket } from 'lucide-react';

const HomePage: React.FC = () => {
	return (
		<div className='space-y-8'>
			<div className='flex justify-between items-start'>
				<div>
					<h1
						className='text-4xl md:text-5xl font-bold mb-2 
                         dark:bg-gradient-to-r dark:from-blue-500 dark:via-purple-400 dark:to-pink-500 dark:text-transparent dark:bg-clip-text
                         text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-purple-600'>
						Welcome back, Stardust!
					</h1>
					<p className='text-lg md:text-xl text-foreground/80'>
						Your personal space for planning and productivity.
					</p>
				</div>
				<Button
					asChild
					className='ml-4 flex-shrink-0'>
					<Link to='/dashboard'>
						<Rocket className='mr-2 h-4 w-4' />
						Get Started
					</Link>
				</Button>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<QuickNote />
				<TodaysTasks />
			</div>

			<div>
				<SubjectsGallery />
			</div>
		</div>
	);
};

export default HomePage;
