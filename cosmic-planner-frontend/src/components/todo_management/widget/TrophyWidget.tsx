/** @format */

import React from 'react';
import { Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { useTheme } from '../../../hooks/useTheme';

interface TrophyWidgetProps {
	percentage: number;
}

const TrophyWidget: React.FC<TrophyWidgetProps> = ({ percentage }) => {
	const { theme } = useTheme();
	const filledColor = theme === 'dark' ? '#facc15' : '#f59e0b'; // yellow-400 or amber-500
	const emptyColor = 'hsl(var(--muted))';

	// CSS custom property to control the clip-path
	const style = {
		'--progress': `${percentage}%`,
	} as React.CSSProperties;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Completion Trophy</CardTitle>
			</CardHeader>
			<CardContent className='flex items-center justify-center p-6'>
				<div
					className='relative h-32 w-32'
					style={style}>
					{/* Background (empty) icon */}
					<Trophy
						className='absolute inset-0 h-full w-full'
						style={{ color: emptyColor }}
						strokeWidth={1}
					/>
					{/* Foreground (filled) icon with clip-path */}
					<div
						className='absolute inset-0 h-full w-full transition-all duration-500 ease-out'
						style={{
							clipPath: 'inset(calc(100% - var(--progress)) 0 0 0)',
						}}>
						<Trophy
							className='h-full w-full'
							style={{ color: filledColor }}
							strokeWidth={1}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default TrophyWidget;
