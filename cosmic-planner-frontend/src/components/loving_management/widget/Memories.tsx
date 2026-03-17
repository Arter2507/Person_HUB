/** @format */

import React from 'react';
import type { MemoriesProps } from '../../../types/loving.type';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const Memories: React.FC<MemoriesProps> = ({
	memories,
	onAdd,
	onEdit,
	onDelete,
}) => {
	return (
		<Card className='mt-8 w-full'>
			<CardHeader>
				<div className='flex justify-between items-center'>
					<CardTitle>Shared Memories</CardTitle>
					<Button onClick={onAdd}>
						<Plus className='mr-2 h-4 w-4' /> Add Memory
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className='space-y-4 max-h-96 overflow-y-auto pr-2'>
					{memories.length > 0 ? (
						memories
							.sort(
								(a, b) =>
									new Date(b.date).getTime() - new Date(a.date).getTime()
							)
							.map((memory) => (
								<div
									key={memory.id}
									className='p-4 bg-background rounded-lg group'>
									<div className='flex justify-between items-start'>
										<div>
											<p className='font-bold text-foreground'>
												{memory.title}
											</p>
											<p className='text-xs text-muted-foreground'>
												{format(memory.date, 'MM-dd-yyyy')}
											</p>
										</div>
										<div className='flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity'>
											<Button
												variant='ghost'
												size='icon'
												className='h-7 w-7'
												onClick={() => onEdit(memory)}>
												<Pencil className='h-4 w-4' />
											</Button>
											<Button
												variant='ghost'
												size='icon'
												className='h-7 w-7 text-destructive'
												onClick={() => onDelete(memory.id)}>
												<Trash2 className='h-4 w-4' />
											</Button>
										</div>
									</div>
									<p className='mt-2 text-sm text-foreground/90'>
										{memory.description}
									</p>
								</div>
							))
					) : (
						<p className='text-center text-muted-foreground py-8'>
							No memories added yet. Start your story!
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default Memories;
