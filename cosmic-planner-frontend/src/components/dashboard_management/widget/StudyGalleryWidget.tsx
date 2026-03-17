/** @format */

import { BookOpen } from 'lucide-react';
import ProgressBar from '../../ui/progressbar';
import { cn } from '../../../lib/utils';
import { WIDGET_CLASSES } from './common';
import { useSharedState } from '../../../hooks/useShareState';

export const StudyGalleryWidget = () => {
	const { subjects } = useSharedState();
	// Display only the first 3 subjects for the dashboard view
	const studySubjects = subjects.slice(0, 3);

	return (
		<div className={cn(WIDGET_CLASSES, 'p-4')}>
			<h3 className='text-lg font-semibold mb-4 flex items-center'>
				<BookOpen className='mr-2 h-5 w-5 text-primary' /> Study Gallery
			</h3>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				{studySubjects.map((subject) => (
					<div
						key={subject.id}
						className='relative rounded-lg overflow-hidden group'>
						<img
							src={subject.image}
							alt={subject.name}
							className='h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105'
						/>
						<div className='absolute inset-0 bg-black/50 p-2 flex flex-col justify-end'>
							<h4 className='font-bold text-white text-sm'>{subject.name}</h4>
							<p className='text-xs text-white/80 mb-2'>{subject.endDate}</p>
							<ProgressBar progress={subject.progress} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
