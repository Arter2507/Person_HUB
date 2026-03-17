/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import type { SidebarProps, NavLinkProps } from '../../types/layout.type';
import {
	LayoutDashboard,
	Zap,
	NotebookText,
	Heart,
	Home,
	CheckSquare,
} from 'lucide-react';

/**
 * A reusable navigation link component for the sidebar.
 * Hides text when the sidebar is collapsed on desktop.
 */
const NavLink: React.FC<NavLinkProps> = ({ to, icon, text, isOpen }) => (
	<Link
		to={to}
		className={`flex items-center p-3 text-text hover:bg-background rounded-lg transition-colors duration-200 ${
			!isOpen && 'md:justify-center'
		}`}>
		{icon}
		<span
			className={`ml-3 font-medium whitespace-nowrap transition-opacity duration-200 ${
				isOpen ? 'opacity-100' : 'opacity-0 md:hidden'
			}`}>
			{text}
		</span>
	</Link>
);

/**
 * The main sidebar.
 * - Floats on top of content on mobile.
 * - Collapses to an icon-only view on desktop.
 */
const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
	return (
		<aside
			className={`bg-card text-text flex flex-col
                    fixed inset-y-0 left-0 z-50 
                    md:relative md:translate-x-0
                    transition-all duration-300 ease-in-out md:flex-shrink-0 overflow-hidden
                    ${
											isOpen
												? 'w-64 translate-x-0'
												: 'w-0 -translate-x-full md:w-20'
										}`}>
			{/* User Profile Section */}
			<div
				className={`h-16 flex-shrink-0 flex items-center border-b border-border overflow-hidden w-full ${
					isOpen ? 'px-4' : 'justify-center'
				}`}>
				<img
					src='https://i.pravatar.cc/48?u=cosmicuser'
					alt='User Avatar'
					className='w-10 h-10 rounded-full flex-shrink-0'
				/>
				<span
					className={`ml-3 font-semibold whitespace-nowrap transition-opacity duration-200 ${
						isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none md:hidden'
					}`}>
					Stardust
				</span>
			</div>

			{/* Primary Navigation */}
			<div className='p-3 border-b border-border space-y-1'>
				<h4
					className={`px-3 pb-1 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider transition-opacity duration-200 ${
						isOpen ? 'opacity-100' : 'opacity-0 md:hidden'
					}`}>
					Main
				</h4>
				<NavLink
					to='/'
					icon={<Home className='h-6 w-6 flex-shrink-0' />}
					text='Home'
					isOpen={isOpen}
				/>
				<NavLink
					to='/dashboard'
					icon={<LayoutDashboard className='h-6 w-6 flex-shrink-0' />}
					text='Dashboard'
					isOpen={isOpen}
				/>
			</div>

			{/* Secondary Navigation */}
			<nav className='flex-1 p-3 space-y-1 overflow-y-auto'>
				<h4
					className={`px-3 pb-1 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider transition-opacity duration-200 ${
						isOpen ? 'opacity-100' : 'opacity-0 md:hidden'
					}`}>
					Modules
				</h4>
				<NavLink
					to='/loving'
					icon={<Heart className='h-6 w-6 flex-shrink-0' />}
					text='Loving'
					isOpen={isOpen}
				/>
				<NavLink
					to='/todo'
					icon={<CheckSquare className='h-6 w-6 flex-shrink-0' />}
					text='Todo List'
					isOpen={isOpen}
				/>
				<NavLink
					to='#'
					icon={<Zap className='h-6 w-6 flex-shrink-0' />}
					text='Habits'
					isOpen={isOpen}
				/>
				<NavLink
					to='#'
					icon={<NotebookText className='h-6 w-6 flex-shrink-0' />}
					text='Notes'
					isOpen={isOpen}
				/>
			</nav>
		</aside>
	);
};

export default Sidebar;
