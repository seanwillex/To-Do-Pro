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
  title: string;
  description: string;
  date: string;
  type: 'one-time' | 'recurring';
  frequency?: 'daily' | 'weekly' | 'monthly';
  enabled: boolean;
  taskId: number | null;
  completed: boolean;
  category: string;
}

export interface Habit {
  id: number;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'anytime';
  status: 'active' | 'inactive' | 'archived';
  streak: number;
  completedDates: string[];
  category: string;
  created: string;
  reminder: {
    enabled: boolean;
    time?: string;
  };
  progress: {
    thisWeek: number;
    thisMonth: number;
    allTime: number;
  };
}

export type ReflectionCategory = 'learning' | 'wellness' | 'goals' | 'personal';
export type ReflectionMood = 'positive' | 'neutral' | 'negative';

export interface Reflection {
  id: number;
  title: string;
  content: string;
  date: string;
  category: ReflectionCategory;
  mood: ReflectionMood;
  learnings?: string[];
  nextSteps?: string[];
  tags: string[];
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

export interface TimeEntry {
  id: number;
  taskId: number | null;
  startTime: string;
  endTime?: string;
  duration: number;
  description: string;
  category: TaskCategory;
  date: string;
}