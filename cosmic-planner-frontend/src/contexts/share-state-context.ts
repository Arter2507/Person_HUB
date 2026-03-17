/** @format */
import { createContext } from 'react';
import type { NoteItem, Subject } from '../types/home.type';

export interface SharedState {
	notes: NoteItem[];
	subjects: Subject[];
	addNote: (text: string) => void;
	deleteNote: (id: number) => void;
	toggleNote: (id: number) => void;
	editNote: (id: number, newText: string) => void;
}

export const SharedStateContext = createContext<SharedState | undefined>(
	undefined
);
