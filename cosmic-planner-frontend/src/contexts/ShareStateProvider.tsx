/** @format */
'use client';

import React, { useState, type ReactNode } from 'react';
import { SharedStateContext } from './share-state-context';
import { initialNotes, initialSubjects } from './share-state-data';
import type { NoteItem } from '../types/home.type';

export const SharedStateProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [notes, setNotes] = useState<NoteItem[]>(initialNotes);
	const [subjects] = useState(initialSubjects);

	const addNote = (text: string) => {
		setNotes((prev) => [...prev, { id: Date.now(), text, completed: false }]);
	};

	const deleteNote = (id: number) => {
		setNotes((prev) => prev.filter((note) => note.id !== id));
	};

	const toggleNote = (id: number) => {
		setNotes((prev) =>
			prev.map((note) =>
				note.id === id ? { ...note, completed: !note.completed } : note
			)
		);
	};

	const editNote = (id: number, newText: string) => {
		setNotes((prev) =>
			prev.map((note) => (note.id === id ? { ...note, text: newText } : note))
		);
	};

	const value = { notes, subjects, addNote, deleteNote, toggleNote, editNote };

	return (
		<SharedStateContext.Provider value={value}>
			{children}
		</SharedStateContext.Provider>
	);
};
