export type TaskTag = 'urgent' | 'in-progress' | 'completed' | 'pending';

export type TaskCategory =
  | 'learning'
  | 'wellness'
  | 'skill-building'
  | 'habits'
  | 'reflection'
  | 'reading'
  | 'project'
  | 'other';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  completedAt?: string;
  dueDate: string;
  tag: TaskTag;
  category?: TaskCategory;
  priority?: TaskPriority;
  description: string;
  tags?: string[];
  reflectionNotes?: string;
  linkedResources?: string[];
  streak?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
  category?: TaskCategory;
  createdAt?: string;
  updatedAt?: string;
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
  category?: TaskCategory;
}

export interface Goal {
  id: number;
  title: string;
  description: string;
  category?: TaskCategory;
  deadline: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  milestones: Milestone[];
  reflections?: Reflection[];
  resources?: Resource[];
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

export interface Habit {
  id: number;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'anytime';
  daysOfWeek?: number[]; // 0-6, where 0 is Sunday
  streak: number;
  completedDates: string[];
  category: TaskCategory;
  created: string;
  reminder?: {
    enabled: boolean;
    time?: string;
  };
  progress?: {
    thisWeek: number;
    thisMonth: number;
    allTime: number;
  };
  notes?: string;
}

export interface Reflection {
  id: number;
  title: string;
  date: string;
  content: string;
  mood: 'positive' | 'neutral' | 'negative';
  learnings: string[];
  nextSteps: string[];
  category?: TaskCategory;
  tags?: string[];
  linkedGoalId?: number;
  linkedHabitId?: number;
  images?: string[];
}

export interface Resource {
  id: number;
  title: string;
  type: 'book' | 'course' | 'video' | 'article' | 'other';
  category?: TaskCategory;
  url?: string;
  notes?: string;
  completedDate?: string;
  startDate?: string;
  progress: number;
  priority?: TaskPriority;
  status?: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  rating?: number;
  timeSpent?: number; // in minutes
  tags?: string[];
}

export interface WellnessMetrics {
  mood: 1 | 2 | 3 | 4 | 5;
  energy: 1 | 2 | 3 | 4 | 5;
  stress: 1 | 2 | 3 | 4 | 5;
  sleep: number;
}

export interface WellnessActivities {
  meditation?: number;
  exercise?: number;
  waterIntake?: number;
  nutrition: 1 | 2 | 3 | 4 | 5;
}

export interface WellnessLog {
  id: number;
  date: string;
  metrics: WellnessMetrics;
  activities: WellnessActivities;
  notes?: string;
  tags?: string[];
}