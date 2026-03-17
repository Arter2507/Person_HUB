/** @format */

import { useContext } from 'react';
import { SharedStateContext } from '../contexts/share-state-context';

export const useSharedState = () => {
	const context = useContext(SharedStateContext);
	if (context === undefined) {
		throw new Error('useSharedState must be used within a SharedStateProvider');
	}
	return context;
};
