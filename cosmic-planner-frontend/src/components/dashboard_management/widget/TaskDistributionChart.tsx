/** @format */

import { useMemo } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import {
	PieChart,
	Pie,
	Cell,
	Legend,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { cn } from '../../../lib/utils';
import { WIDGET_CLASSES } from './common';

const taskDistributionData = [
	{ name: 'Study', value: 45 },
	{ name: 'Personal', value: 30 },
	{ name: 'Work', value: 25 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}: {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	percent: number;
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill='white'
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline='central'>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

export const TaskDistributionChart = () => {
	const { theme } = useTheme();
	const tooltipBg =
		theme === 'dark' ? 'hsl(var(--card))' : 'hsl(var(--background))';
	const tooltipBorder = 'hsl(var(--border))';
	const tooltipColor = 'hsl(var(--foreground))';
	const COLORS = useMemo(
		() =>
			theme === 'dark'
				? ['#6366f1', '#a855f7', '#ec4899']
				: ['#A7C7E7', '#89a5e0', '#FFB7C5'],
		[theme]
	);

	return (
		<div className={cn(WIDGET_CLASSES, 'p-4 md:p-6 col-span-1 flex flex-col')}>
			<h3 className='text-lg font-semibold mb-4'>Task Distribution</h3>
			<ResponsiveContainer
				width='100%'
				height={300}>
				<PieChart>
					<Pie
						data={taskDistributionData}
						dataKey='value'
						nameKey='name'
						cx='50%'
						cy='50%'
						innerRadius={60}
						outerRadius={80}
						fill='#8884d8'
						paddingAngle={5}
						labelLine={false}
						label={(props: {
							cx?: number | string;
							cy?: number | string;
							midAngle?: number;
							innerRadius?: number;
							outerRadius?: number;
							percent?: number;
						}) =>
							renderCustomizedLabel({
								cx: typeof props.cx === 'number' ? props.cx : Number(props.cx),
								cy: typeof props.cy === 'number' ? props.cy : Number(props.cy),
								midAngle: props.midAngle ?? 0,
								innerRadius: props.innerRadius ?? 0,
								outerRadius: props.outerRadius ?? 0,
								percent: props.percent ?? 0,
							})
						}>
						{taskDistributionData.map((_entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip
						contentStyle={{
							backgroundColor: tooltipBg,
							borderColor: tooltipBorder,
							borderRadius: '0.5rem',
							// CHANGE: Applied the theme-aware text color
							color: tooltipColor,
						}}
					/>
					<Legend iconType='circle' />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};
