/** @format */

import { useTheme } from '../../../hooks/useTheme';
import { BarChart } from 'lucide-react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { cn } from '../../../lib/utils';
import { WIDGET_CLASSES } from './common';

const weeklyProgressData = [
	{ name: 'Mon', tasks: 4, xp: 20 },
	{ name: 'Tue', tasks: 6, xp: 45 },
	{ name: 'Wed', tasks: 3, xp: 15 },
	{ name: 'Thu', tasks: 8, xp: 70 },
	{ name: 'Fri', tasks: 5, xp: 50 },
	{ name: 'Sat', tasks: 7, xp: 60 },
	{ name: 'Sun', tasks: 2, xp: 10 },
];

export const WeeklyProgressChart = () => {
	const { theme } = useTheme();
	const lineColor = theme === 'dark' ? '#A7C7E7' : '#1e40af';
	const tooltipBg =
		theme === 'dark' ? 'hsl(var(--card))' : 'hsl(var(--background))';
	const tooltipBorder = 'hsl(var(--border))';

	return (
		<div className={cn(WIDGET_CLASSES, 'p-4 md:p-6 col-span-2')}>
			<h3 className='text-lg font-semibold mb-4 flex items-center'>
				<BarChart className='mr-2 h-5 w-5 text-primary' /> Weekly Progress
			</h3>
			<ResponsiveContainer
				width='100%'
				height={300}>
				<LineChart data={weeklyProgressData}>
					<XAxis
						dataKey='name'
						stroke='hsl(var(--muted-foreground))'
						fontSize={12}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						stroke='hsl(var(--muted-foreground))'
						fontSize={12}
						tickLine={false}
						axisLine={false}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: tooltipBg,
							borderColor: tooltipBorder,
							borderRadius: '0.5rem',
						}}
					/>
					<Line
						type='monotone'
						dataKey='tasks'
						stroke={lineColor}
						strokeWidth={2}
						dot={{ r: 4 }}
						activeDot={{ r: 6 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
