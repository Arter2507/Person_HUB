/** @format */

import React, { useMemo } from 'react';
import ProgressChart from './ProgressChart';
import TrophyWidget from './TrophyWidget';
import StatsWidget from './StatsWidget';
import { useTodoContext } from '../../../hooks/useTodoContext';

const GamifyDashboard: React.FC = () => {
	const { todos } = useTodoContext();

	const {
		completedCount,
		totalCount,
		completionPercentage,
		totalXp,
		totalCoins,
	} = useMemo(() => {
		const completed = todos.filter((t) => t.completed);
		const total = todos.length;
		return {
			completedCount: completed.length,
			totalCount: total,
			completionPercentage:
				total > 0 ? Math.round((completed.length / total) * 100) : 0,
			totalXp: completed.reduce((sum, t) => sum + t.xp, 0),
			totalCoins: completed.reduce((sum, t) => sum + t.coin, 0),
		};
	}, [todos]);

	return (
		<div className='space-y-6'>
			<ProgressChart percentage={completionPercentage} />
			<TrophyWidget percentage={completionPercentage} />
			<StatsWidget
				totalXp={totalXp}
				totalCoins={totalCoins}
				completedCount={completedCount}
				totalCount={totalCount}
			/>
		</div>
	);
};

export default GamifyDashboard;
