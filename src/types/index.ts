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

export interface Doc {
  id: number;
  title: string;
  content: string;
  category: string;
  lastUpdated: string;
}

export interface TimeEntry {
  id: number;
  taskId: number;
  title: string;
  startTime: string;
  endTime?: string;
  duration: number;
  description: string;
}

export interface Goal {
  id: number;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  milestones: Milestone[];
}

export interface Milestone {
  id: number;
  goalId: number;
  title: string;
  dueDate: string;
  completed: boolean;
  description?: string;
}

export interface Reminder {
  id: number;
  taskId: number;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  status: 'pending' | 'completed' | 'dismissed' | 'all';
  priority: 'low' | 'medium' | 'high';
  repeat?: 'daily' | 'weekly' | 'monthly' | 'none';
}