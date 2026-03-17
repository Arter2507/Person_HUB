/** @format */

import React from 'react';
import type { ProgressBarProps } from '../../types/components.type';

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
	const progressPercentage = Math.max(0, Math.min(100, progress));

	return (
		<div className='w-full bg-background rounded-full h-2.5'>
			<div
				className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 h-2.5 rounded-full'
				style={{ width: `${progressPercentage}%` }}
				aria-valuenow={progressPercentage}
				aria-valuemin={0}
				aria-valuemax={100}
				role='progressbar'></div>
		</div>
	);
};

export default ProgressBar;
