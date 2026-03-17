/** @format */

export interface NoteItem {
	id: number;
	text: string;
	completed: boolean;
}

export interface Task {
	id: number;
	text: string;
	completed: boolean;
}

export interface Subject {
	id: number;
	name: string;
	image: string;
	startDate: string;
	endDate: string;
	progress: number;
}

export interface SubjectCardProps {
	subject: Subject;
}
