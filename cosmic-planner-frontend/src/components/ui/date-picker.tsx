/** @format */

'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface DatePickerProps {
	date?: Date;
	onDateChange: (date?: Date) => void;
	fromDate?: Date;
	toDate?: Date;
}

export function DatePicker({
	date,
	onDateChange,
	fromDate,
	toDate,
}: DatePickerProps) {
	const defaultFromDate = new Date(1920, 0, 1);
	const defaultToDate = new Date();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-full justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, 'MM/dd/yyyy') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={onDateChange}
					fromDate={fromDate || defaultFromDate}
					toDate={toDate || defaultToDate}
					captionLayout='dropdown'
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
