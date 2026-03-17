import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon, Settings, User, LogOut, PanelLeftClose, PanelLeftOpen, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const ThemeSwitch: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    const toggleTheme = () => {
        setTheme(isDarkMode ? 'light' : 'dark');
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
};

const UserMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const userName = "Explorer";

    return (
        <div className="relative" ref={dropdownRef}>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full" onClick={() => setIsOpen(!isOpen)}>
                <img
                    src={`https://api.dicebear.com/8.x/bottts/svg?seed=${userName}`}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full border-2 border-primary/50"
                />
            </Button>
            {isOpen && (
                 <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-popover text-popover-foreground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="p-1">
                        <div className="px-3 py-2">
                            <p className="text-sm font-medium">Signed in as</p>
                            <p className="truncate text-sm text-muted-foreground">{userName}</p>
                        </div>
                         <div className="h-px bg-border my-1" />
                        <a href="#" className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent"><User className="mr-2 h-4 w-4" /><span>Profile</span></a>
                        <a href="#" className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent"><Settings className="mr-2 h-4 w-4" /><span>Settings</span></a>
                        <div className="h-px bg-border my-1" />
                        <a href="#" className="flex items-center w-full px-3 py-2 text-sm rounded-md text-destructive hover:bg-accent"><LogOut className="mr-2 h-4 w-4" /><span>Sign out</span></a>
                    </div>
                 </div>
            )}
        </div>
    );
}

interface HeaderProps {
    onToggleMobileMenu: () => void;
    onToggleSidebar: () => void;
    isSidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu, onToggleSidebar, isSidebarCollapsed }) => {
    return (
        <header className="h-16 flex-shrink-0 bg-card/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 md:px-6 z-30">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleMobileMenu}>
                    <Menu className="h-6 w-6" />
                </Button>
                 <Button variant="ghost" size="icon" className="hidden md:inline-flex" onClick={onToggleSidebar}>
                    {isSidebarCollapsed ? <PanelLeftOpen className="h-6 w-6" /> : <PanelLeftClose className="h-6 w-6" />}
                </Button>
            </div>
            
            <div className="flex items-center gap-4">
                <ThemeSwitch />
                <UserMenu />
            </div>
        </header>
    );
};

export default Header;
