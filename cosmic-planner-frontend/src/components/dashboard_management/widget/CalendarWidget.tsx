/** @format */

import { CalendarDays } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { WIDGET_CLASSES } from './common';
import {
	format,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	getDay,
	isToday,
	isSameMonth,
} from 'date-fns';

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const CalendarWidget = () => {
	const today = new Date();
	const firstDayOfMonth = startOfMonth(today);
	const lastDayOfMonth = endOfMonth(today);

	const daysInMonth = eachDayOfInterval({
		start: firstDayOfMonth,
		end: lastDayOfMonth,
	});

	const startingDayIndex = getDay(firstDayOfMonth);

	return (
		<div className={cn(WIDGET_CLASSES, 'p-4')}>
			<h3 className='text-lg font-semibold mb-4 flex items-center'>
				<CalendarDays className='mr-2 h-5 w-5 text-primary' /> Calendar
			</h3>
			<div className='text-center font-bold text-lg mb-2'>
				{format(today, 'MMMM yyyy')}
			</div>
			<div className='grid grid-cols-7 text-center text-xs text-muted-foreground'>
				{weekdays.map((day) => (
					<div key={day}>{day}</div>
				))}
			</div>
			<div className='grid grid-cols-7 text-center text-sm mt-2 gap-y-1'>
				{Array.from({ length: startingDayIndex }).map((_, i) => (
					<div key={`empty-${i}`} />
				))}
				{daysInMonth.map((day, i) => (
					<div
						key={i}
						className={cn(
							'p-1 rounded-full w-8 h-8 mx-auto flex items-center justify-center',
							isToday(day) && 'bg-primary text-primary-foreground font-bold',
							!isSameMonth(day, today) && 'text-muted-foreground/50'
						)}>
						{format(day, 'd')}
					</div>
				))}
			</div>
		</div>
	);
};
