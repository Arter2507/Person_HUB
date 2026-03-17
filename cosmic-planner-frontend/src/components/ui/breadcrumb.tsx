/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card } from './card';

interface BreadcrumbItem {
	label: string;
	href?: string;
	icon?: React.ReactNode;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
	className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
	return (
		<Card className={cn('p-0 overflow-hidden', className)}>
			<nav
				aria-label='breadcrumb'
				className='p-2'>
				<ol className='flex items-center text-sm'>
					{items.map((item, index) => {
						const content = (
							<span className='flex items-center'>
								{/* FIX: Cast the icon to a ReactElement with a className prop to resolve the TypeScript error with React.cloneElement. */}
								{item.icon &&
									React.cloneElement(
										item.icon as React.ReactElement<{ className?: string }>,
										{ className: 'h-4 w-4 mr-2 flex-shrink-0' }
									)}
								{item.label}
							</span>
						);
						return (
							<li
								key={index}
								className='flex items-center'>
								{item.href ? (
									<Link
										to={item.href}
										className='text-muted-foreground hover:text-foreground transition-colors'>
										{content}
									</Link>
								) : (
									<span className='font-semibold text-foreground'>
										{content}
									</span>
								)}
								{index < items.length - 1 && (
									<ChevronRight className='h-4 w-4 mx-1.5 text-muted-foreground' />
								)}
							</li>
						);
					})}
				</ol>
			</nav>
		</Card>
	);
};

export default Breadcrumb;
