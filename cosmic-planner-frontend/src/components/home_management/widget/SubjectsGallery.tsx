/** @format */

import React from 'react';
import ProgressBar from '../../ui/progressbar';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import type { SubjectCardProps } from '../../../types/home.type';
import { useSharedState } from '../../../hooks/useShareState';

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
	return (
		<Card className='overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
			<img
				className='h-40 w-full object-cover'
				src={subject.image}
				alt={subject.name}
			/>
			<CardHeader>
				<CardTitle className='truncate'>{subject.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='text-xs text-muted-foreground mt-1 space-x-2'>
					<span>Start: {subject.startDate}</span>
					<span>End: {subject.endDate}</span>
				</div>
				<div className='mt-4'>
					<div className='flex justify-between items-center mb-1'>
						<span className='text-sm font-medium text-foreground'>
							Progress
						</span>
						<span className='text-sm font-medium text-primary'>
							{subject.progress}%
						</span>
					</div>
					<ProgressBar progress={subject.progress} />
				</div>
			</CardContent>
		</Card>
	);
};

const SubjectsGallery: React.FC = () => {
	const { subjects } = useSharedState();
	return (
		<div>
			<h2 className='text-2xl font-bold text-foreground mb-4'>
				Current Subjects
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{subjects.map((subject) => (
					<SubjectCard
						key={subject.id}
						subject={subject}
					/>
				))}
			</div>
		</div>
	);
};

export default SubjectsGallery;
