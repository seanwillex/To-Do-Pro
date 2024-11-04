export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  tag: 'urgent' | 'in-progress' | 'completed' | 'pending';
  description: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
}

export type TaskTag = {
  [key: string]: string;
} 