import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Home, ListTodo, Repeat, Notebook, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, isCollapsed }) => {
  const activeClass = 'bg-primary/10 text-primary';
  const inactiveClass = 'text-muted-foreground hover:bg-muted hover:text-foreground';

  // For the demo, make all links point to the dashboard, as other pages don't exist yet.
  const destination = to === "/" ? "/" : "#";

  return (
    <RouterNavLink
      to={destination}
      end={destination === "/"} // Use 'end' for the root path to avoid it matching all child routes
      className={({ isActive }) =>
        cn(
          'flex items-center h-10 rounded-md transition-colors duration-200',
          isActive ? activeClass : inactiveClass,
          isCollapsed ? 'justify-center' : 'px-4'
        )
      }
    >
      {icon}
      <span className={cn('ml-3', { 'hidden': isCollapsed })}>{label}</span>
    </RouterNavLink>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onClose: () => void;
}

const SidebarContent: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => (
    <>
      <div className={cn("flex items-center h-16 px-4", isCollapsed ? 'justify-center' : 'justify-start')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        <span className={cn("text-xl font-bold text-foreground ml-2", { 'hidden': isCollapsed })}>Cosmic Hub</span>
      </div>
      
      <nav className="flex flex-col gap-2 mt-8 px-2">
        <NavLink to="/" icon={<Home size={20} />} label="Dashboard" isCollapsed={isCollapsed} />
        <NavLink to="/todo" icon={<ListTodo size={20} />} label="Todo List" isCollapsed={isCollapsed} />
        <NavLink to="/habits" icon={<Repeat size={20} />} label="Habits" isCollapsed={isCollapsed} />
        <NavLink to="/notes" icon={<Notebook size={20} />} label="Notes" isCollapsed={isCollapsed} />
      </nav>
    </>
);

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, isMobileOpen, onClose }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:flex flex-col flex-shrink-0 bg-card border-r border-border transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <SidebarContent isCollapsed={isCollapsed} />
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300',
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-card border-r border-border flex-col flex-shrink-0 z-50 transition-transform duration-300 ease-in-out md:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground">
            <X size={24}/>
        </button>
        <SidebarContent isCollapsed={false} />
      </aside>
    </>
  );
};

export default Sidebar;
