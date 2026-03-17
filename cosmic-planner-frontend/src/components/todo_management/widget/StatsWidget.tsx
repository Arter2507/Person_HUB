/** @format */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Star, CircleDollarSign, CheckCircle, ListTodo } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface StatsWidgetProps {
	totalXp: number;
	totalCoins: number;
	completedCount: number;
	totalCount: number;
}

const StatItem: React.FC<{
	icon: React.ReactNode;
	label: string;
	value: string | number;
	valueClassName?: string;
}> = ({ icon, label, value, valueClassName }) => (
	<div className='flex items-center justify-between'>
		<div className='flex items-center'>
			<div className='mr-3'>{icon}</div>
			<span className='text-sm text-muted-foreground'>{label}</span>
		</div>
		<span className={cn('font-bold text-foreground', valueClassName)}>
			{value}
		</span>
	</div>
);

const StatsWidget: React.FC<StatsWidgetProps> = ({
	totalXp,
	totalCoins,
	completedCount,
	totalCount,
}) => {
	const pendingCount = totalCount - completedCount;
	return (
		<Card>
			<CardHeader>
				<CardTitle>Quest Summary</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<StatItem
					icon={<Star className='h-5 w-5 text-yellow-400' />}
					label='Total XP Earned'
					value={totalXp}
				/>
				<StatItem
					icon={<CircleDollarSign className='h-5 w-5 text-green-400' />}
					label='Coins Collected'
					value={totalCoins}
				/>
				<StatItem
					icon={<CheckCircle className='h-5 w-5 text-blue-400' />}
					label='Tasks Completed'
					value={`${completedCount} / ${totalCount}`}
				/>
				<StatItem
					icon={<ListTodo className='h-5 w-5 text-red-400' />}
					label='Tasks Pending'
					value={pendingCount}
					valueClassName={
						pendingCount > 0 ? 'text-red-500 dark:text-red-400' : ''
					}
				/>
			</CardContent>
		</Card>
	);
};

export default StatsWidget;
