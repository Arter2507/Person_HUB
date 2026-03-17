/** @format */

import React from 'react';
import { cn } from '../../../lib/utils';
import { WIDGET_CLASSES } from './common';

export const StatCard = ({
	icon,
	title,
	value,
	colorClass,
}: {
	icon: React.ReactNode;
	title: string;
	value: string;
	colorClass: string;
}) => (
	<div className={cn(WIDGET_CLASSES, 'p-4 flex items-center space-x-4')}>
		<div className={`p-3 rounded-full bg-accent/50 ${colorClass}`}>{icon}</div>
		<div>
			<p className='text-sm text-muted-foreground'>{title}</p>
			<p className='text-2xl font-bold'>{value}</p>
		</div>
	</div>
);
