/** @format */

import React from 'react';
import type { MainContentProps } from '../../types/layout.type';

/**
 * A simple wrapper component for the main content area of a page.
 * It ensures that page-specific content is placed correctly within the AppLayout.
 */
const MainContent: React.FC<MainContentProps> = ({ children }) => {
	return (
		<div className='w-full'>
			{/* This component acts as a flexible container for whatever page content is passed to it. */}
			{children}
		</div>
	);
};

export default MainContent;
