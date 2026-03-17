/** @format */

import { type ReactNode } from 'react';

export interface HeaderProps {
	toggleSidebar: () => void;
	isSidebarOpen: boolean;
}

export interface SidebarProps {
	isOpen: boolean;
}

export interface NavLinkProps {
	to: string;
	icon: React.ReactNode;
	text: string;
	isOpen: boolean;
}

export interface MainContentProps {
	children: ReactNode;
}
