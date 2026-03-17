/** @format */

import { MessageSquareQuote } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { WIDGET_CLASSES } from './common';

const quotes = [
	'The cosmos is within us. We are made of star-stuff.',
	"Shoot for the moon. Even if you miss, you'll land among the stars.",
	'The future is not something we enter. The future is something we create.',
	'To the stars who listen—and the dreams that are answered.',
];

export const PromotionWidget = () => {
	// Simple logic to get a quote based on the day of the month
	const quote = quotes[new Date().getDate() % quotes.length];

	return (
		<div className={cn(WIDGET_CLASSES, 'p-4 text-center')}>
			<h3 className='text-lg font-semibold mb-2 flex items-center justify-center'>
				<MessageSquareQuote className='mr-2 h-5 w-5 text-primary' /> Daily Dose
				of Cosmic
			</h3>
			<p className='text-sm text-muted-foreground italic'>"{quote}"</p>
		</div>
	);
};
