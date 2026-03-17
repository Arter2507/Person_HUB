/** @format */

import React from 'react';
import { Flame, CheckCircle2, Star } from 'lucide-react';
import { StatCard } from './widget/StatCard';
import { WeeklyProgressChart } from './widget/WeeklyProgressChart';
import { TaskDistributionChart } from './widget/TaskDistributionChart';
import { CalendarWidget } from './widget/CalendarWidget';
import { StudyGalleryWidget } from './widget/StudyGalleryWidget';
import { QuickNoteWidget } from './widget/QuickNoteWidget';
import { PromotionWidget } from './widget/PromotionWidget';

const Dashboard: React.FC = () => {
	return (
		<div className='space-y-6'>
			{/* Stats Section */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				<StatCard
					icon={<Flame className='h-6 w-6' />}
					title='Streak'
					value='15 days'
					colorClass='text-red-500'
				/>
				<StatCard
					icon={<CheckCircle2 className='h-6 w-6' />}
					title='Tasks Completed'
					value='128'
					colorClass='text-green-500'
				/>
				<StatCard
					icon={<Star className='h-6 w-6' />}
					title='XP Points'
					value='1500 XP'
					colorClass='text-yellow-500'
				/>
			</div>

			{/* Main Grid Layout */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Left Column: Charts and Gallery */}
				<div className='lg:col-span-2 space-y-6'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<WeeklyProgressChart />
						<TaskDistributionChart />
					</div>
					<StudyGalleryWidget />
				</div>

				{/* Right Column: Calendar, Promotion & Notes */}
				<div className='lg:col-span-1 space-y-6'>
					<CalendarWidget />
					<PromotionWidget />
					<QuickNoteWidget />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
