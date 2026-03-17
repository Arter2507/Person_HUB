/** @format */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Star, Flame, Award } from 'lucide-react';

// A collection of inspirational quotes.
const quotes = [
	'The best way to predict the future is to create it.',
	'Your future is created by what you do today, not tomorrow.',
	'The secret of getting ahead is getting started.',
	"Believe you can and you're halfway there.",
	'The journey of a thousand miles begins with a single step.',
];

const getPageTitle = (pathname: string): string => {
	if (pathname === '/') return 'Home';
	const title = pathname.replace('/', '').replace(/-/g, ' ');
	return title.charAt(0).toUpperCase() + title.slice(1);
};

/**
 * A status bar showing user information, gamification stats, and a daily quote.
 */
const UserStatusBar: React.FC = () => {
	const [quote, setQuote] = useState('');
	const location = useLocation();

	const pageTitle = getPageTitle(location.pathname);
	const welcomeMessage =
		location.pathname === '/' ? (
			'Welcome, Stardust!'
		) : (
			<>
				Stardust, you are on the{' '}
				<strong className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-custom to-accent-custom dark:from-indigo-400 dark:to-purple-400'>
					{pageTitle}
				</strong>{' '}
				page.
			</>
		);

	useEffect(() => {
		// Get a new quote every day based on the day of the year to ensure it's consistent for the whole day.
		const dayOfYear = Math.floor(
			(new Date().getTime() -
				new Date(new Date().getFullYear(), 0, 0).getTime()) /
				(1000 * 60 * 60 * 24)
		);
		setQuote(quotes[dayOfYear % quotes.length]);
	}, []);

	return (
		<div className='bg-card border border-border rounded-xl shadow-md p-4 flex flex-wrap items-center justify-between gap-4'>
			{/* Left side: Welcome & Quote */}
			<div>
				<h2 className='text-2xl font-bold text-foreground'>{welcomeMessage}</h2>
				<p className='text-sm text-foreground/70 italic mt-1'>"{quote}"</p>
			</div>

			{/* Right side: Avatar & Stats */}
			<div className='flex items-center space-x-4'>
				<div className='flex items-center space-x-2 bg-background p-2 rounded-lg text-sm'>
					<div
						className='flex items-center space-x-1'
						title='Experience Points'>
						<Star className='h-5 w-5 text-yellow-400' />
						<span className='font-semibold'>1,250</span>
					</div>
					<div
						className='flex items-center space-x-1'
						title='Daily Streak'>
						<Flame className='h-5 w-5 text-red-500' />
						<span className='font-semibold'>12</span>
					</div>
					<div
						className='flex items-center space-x-1'
						title='Level'>
						<Award className='h-5 w-5 text-green-500' />
						<span className='font-semibold'>8</span>
					</div>
				</div>
				<img
					src='https://i.pravatar.cc/48?u=cosmicuser'
					alt='User Avatar'
					className='w-12 h-12 rounded-full border-2 border-primary'
				/>
			</div>
		</div>
	);
};

export default UserStatusBar;
