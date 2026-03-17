/** @format */

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import UserStatusBar from '../components/layout/UserStatusBar';
import MainContent from '../components/layout/MainContent';
import { Toaster } from 'sonner';

const AppLayout: React.FC = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	return (
		// Use flexbox to position sidebar and main content side-by-side
		<div className='flex min-h-screen bg-background text-foreground font-sans'>
			<Toaster
				richColors
				position='top-right'
			/>
			{/* Sidebar component. It's fixed on mobile and part of the flex layout on desktop */}
			<Sidebar isOpen={isSidebarOpen} />

			{/* Overlay for mobile view, appears when sidebar is open */}
			{isSidebarOpen && (
				<div
					onClick={toggleSidebar}
					className='fixed inset-0 bg-black/60 z-40 md:hidden'
					aria-hidden='true'></div>
			)}

			{/* Main content area that takes up the remaining space */}
			<div className='flex-1 flex flex-col min-h-screen'>
				<Header
					toggleSidebar={toggleSidebar}
					isSidebarOpen={isSidebarOpen}
				/>

				{/* The main scrollable content area */}
				<main className='flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto'>
					<UserStatusBar />
					<MainContent>
						<Outlet />
					</MainContent>
				</main>

				<Footer />
			</div>
		</div>
	);
};

export default AppLayout;
