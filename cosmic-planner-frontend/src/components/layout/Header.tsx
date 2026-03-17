/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import type { HeaderProps } from '../../types/layout.type';
import {
	Menu,
	X,
	Settings,
	User,
	LogOut,
	Sun,
	Moon,
	Sparkles,
} from 'lucide-react';

/**
 * An animated switch for toggling between light and dark themes, featuring sun and moon icons.
 */
const ThemeToggleSwitch: React.FC = () => {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === 'dark';

	return (
		<label
			htmlFor='theme-toggle'
			className='relative inline-flex items-center cursor-pointer'
			aria-label='Toggle theme'>
			<input
				type='checkbox'
				id='theme-toggle'
				className='sr-only'
				checked={isDark}
				onChange={toggleTheme}
			/>
			{/* Track for the toggle, containing icons */}
			<div
				className={`w-16 h-8 rounded-full relative transition-colors duration-300 flex items-center justify-between px-1.5 ${
					isDark
						? 'bg-gradient-to-r from-indigo-900 via-slate-800 to-slate-900'
						: 'bg-slate-200'
				}`}>
				{/* Moon Icon */}
				<Moon
					className={`h-5 w-5 transition-colors duration-300 ${
						isDark ? 'text-slate-300' : 'text-primary'
					}`}
				/>
				{/* Sun Icon */}
				<Sun
					className={`h-5 w-5 transition-colors duration-300 ${
						isDark ? 'text-yellow-400' : 'text-amber-500'
					}`}
				/>

				{/* Sliding Knob */}
				<div
					className={`absolute w-6 h-6 rounded-full transition-transform duration-300 shadow-lg ${
						isDark ? 'translate-x-8 bg-yellow-200' : 'translate-x-0 bg-white'
					} top-1 left-1`}></div>
			</div>
		</label>
	);
};

/**
 * A dropdown menu for user settings.
 */
const SettingsDropdown: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='p-2 rounded-full hover:bg-primary/20 transition-colors'
				aria-label='Setting button'
				aria-haspopup='true'
				aria-expanded={isOpen}>
				<Settings className='h-6 w-6' />
			</button>
			{isOpen && (
				<div
					className='absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl z-50 py-1'
					role='menu'>
					<a
						href='#'
						className='flex items-center px-4 py-2 text-text hover:bg-background'
						role='menuitem'>
						<User className='h-5 w-5 mr-2' /> Profile
					</a>
					<a
						href='#'
						className='flex items-center px-4 py-2 text-text hover:bg-background'
						role='menuitem'>
						<LogOut className='h-5 w-5 mr-2' /> Sign Out
					</a>
				</div>
			)}
		</div>
	);
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
	return (
		<header className='bg-card/80 backdrop-blur-sm sticky top-0 z-30 border-b border-border shadow-sm h-16 flex-shrink-0'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 h-full'>
				<div className='flex items-center justify-between h-full'>
					<div className='flex items-center'>
						<button
							onClick={toggleSidebar}
							className='p-2 rounded-md hover:bg-primary/20 md:hidden'
							aria-label='Toggle sidebar'>
							{isSidebarOpen ? (
								<X className='h-6 w-6' />
							) : (
								<Menu className='h-6 w-6' />
							)}
						</button>
						<button
							onClick={toggleSidebar}
							className='p-2 rounded-md hover:bg-primary/20 hidden md:block'
							aria-label='Toggle sidebar'>
							<Menu className='h-6 w-6' />
						</button>
						<Link
							to='/'
							className='flex items-center space-x-2 ml-4'
							aria-label='Go to homepage'>
							<Sparkles className='h-8 w-8 text-primary' />
							<h1 className='text-xl font-bold text-text hidden sm:block whitespace-nowrap'>
								Cosmic Planner Hub
							</h1>
						</Link>
					</div>
					<div className='flex items-center space-x-4'>
						<ThemeToggleSwitch />
						<SettingsDropdown />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
