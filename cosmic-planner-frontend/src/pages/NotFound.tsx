/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const NotFoundPage: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center'>
			<img
				src='../../public/404_NotFound.png'
				alt='not found'
				className='max-w-full mb-6- w-96'
			/>
			<h1 className='text-8xl font-bold text-primary mb-4'>404</h1>
			<p className='text-2xl font-medium mb-2'>Oops! Page Not Found</p>
			<p className='text-muted-foreground mb-8'>
				The cosmic page you are looking for does not exist or has been moved to
				another galaxy.
			</p>
			<Button asChild>
				<Link to='/'>Go Back to Home</Link>
			</Button>
			<div className='absolute bottom-8 text-xs text-muted-foreground'>
				<p>
					&copy; {new Date().getFullYear()} Cosmic Planner Hub. All rights
					reserved.
				</p>
			</div>
		</div>
	);
};

export default NotFoundPage;
