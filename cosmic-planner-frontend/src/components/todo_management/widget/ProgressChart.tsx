/** @format */

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { useTheme } from '../../../hooks/useTheme';

interface ProgressChartProps {
	percentage: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ percentage }) => {
	const { theme } = useTheme();
	const data = [
		{ name: 'Completed', value: percentage },
		{ name: 'Pending', value: 100 - percentage },
	];

	const completedColor = theme === 'dark' ? '#A7C7E7' : '#4f46e5';
	const pendingColor =
		theme === 'dark' ? 'hsl(var(--muted) / 0.5)' : 'hsl(var(--secondary))';
	const textColor = 'hsl(var(--foreground))';

	return (
		<Card>
			<CardHeader>
				<CardTitle>Cosmic Progress</CardTitle>
			</CardHeader>
			<CardContent>
				<div style={{ width: '100%', height: 250, position: 'relative' }}>
					<ResponsiveContainer>
						<PieChart>
							<Pie
								data={data}
								cx='50%'
								cy='50%'
								innerRadius={70}
								outerRadius={90}
								startAngle={90}
								endAngle={450}
								paddingAngle={2}
								dataKey='value'>
								<Cell
									key='completed'
									fill={completedColor}
									stroke={completedColor}
								/>
								<Cell
									key='pending'
									fill={pendingColor}
									stroke={pendingColor}
								/>
							</Pie>
						</PieChart>
					</ResponsiveContainer>
					<div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
						<div className='text-center'>
							<span
								className='text-4xl font-bold'
								style={{ color: textColor }}>
								{percentage}%
							</span>
							<p className='text-sm text-muted-foreground'>Completed</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProgressChart;
