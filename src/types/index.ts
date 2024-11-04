export type TaskTag = 'urgent' | 'in-progress' | 'completed' | 'pending';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  tag: TaskTag;
  description: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
}