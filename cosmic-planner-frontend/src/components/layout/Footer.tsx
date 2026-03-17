/** @format */

import React, { useState, useEffect } from 'react';

/**
 * The application footer, which displays copyright info and a live-updating clock.
 */
const Footer: React.FC = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		// Set up an interval to update the time every second.
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		// Clean up the interval when the component unmounts.
		return () => {
			clearInterval(timer);
		};
	}, []);

	// Format the date to MM/DD/YYYY (en-US).
	const formattedDate = currentTime.toLocaleDateString('en-US', {
		month: '2-digit',
		day: '2-digit',
		year: 'numeric',
	});

	// Format the time to HH:MM (vi-VN 24-hour format).
	const formattedTime = currentTime.toLocaleTimeString('vi-VN', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});

	return (
		<footer className='bg-card border-t border-border px-4 sm:px-6 lg:px-8 py-2 h-10 flex-shrink-0'>
			<div className='container mx-auto flex items-center justify-between h-full text-xs text-text/60'>
				{/* Left side: Copyright information */}
				<p>
					&copy; {new Date().getFullYear()} Cosmic Planner Hub. All rights
					reserved.
				</p>

				{/* Right side: Live date and time */}
				<div className='flex items-center space-x-2 font-mono'>
					<span>{formattedDate}</span>
					<span className='font-bold'>{formattedTime}</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
