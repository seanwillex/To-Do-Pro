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
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  description?: string;
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

export interface MindMap {
  id: number;
  title: string;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
}

export interface MindMapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'root' | 'branch' | 'leaf';
}

export interface MindMapEdge {
  source: string;
  target: string;
}