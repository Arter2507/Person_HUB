/** @format */
import type { NoteItem, Subject } from '../types/home.type';

export const initialNotes: NoteItem[] = [
	{ id: 1, text: 'Brainstorm ideas for the presentation', completed: false },
	{ id: 2, text: 'Buy more coffee beans', completed: true },
	{ id: 3, text: 'Call the library about the reserved book', completed: false },
];

export const initialSubjects: Subject[] = [
	{
		id: 1,
		name: 'Quantum Physics',
		image: 'https://images.unsplash.com/photo-1582719478212-c857e540b691?...',
		startDate: '2023-09-01',
		endDate: '2023-12-15',
		progress: 75,
	},
	{
		id: 2,
		name: 'Astrobiology',
		image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?...',
		startDate: '2023-09-01',
		endDate: '2023-12-15',
		progress: 40,
	},
	{
		id: 3,
		name: 'Cosmic Art History',
		image: 'https://images.unsplash.com/photo-1506878206813-f272b1f3e475?...',
		startDate: '2023-09-01',
		endDate: '2023-12-15',
		progress: 90,
	},
	{
		id: 4,
		name: 'Rocket Propulsion',
		image: 'https://images.unsplash.com/photo-1614728263952-84ea256ec346?...',
		startDate: '2023-09-01',
		endDate: '2023-12-15',
		progress: 25,
	},
];
