import { TaskTag, TaskCategory, Task, Note, Goal, Habit, Reflection, Resource, TimeEntry, Reminder } from '@/types';

export const TASK_TAGS: Record<TaskTag, string> = {
  'urgent': 'bg-red-500',
  'in-progress': 'bg-yellow-500',
  'completed': 'bg-green-500',
  'pending': 'bg-blue-500'
} as const;

export const TASK_CATEGORIES: Record<TaskCategory, string> = {
  'learning': 'bg-blue-500',
  'wellness': 'bg-green-500',
  'skill-building': 'bg-purple-500',
  'habits': 'bg-yellow-500',
  'reflection': 'bg-pink-500',
  'reading': 'bg-indigo-500',
  'project': 'bg-orange-500',
  'other': 'bg-gray-500'
} as const;

export const INITIAL_TASKS: Task[] = [];

export const INITIAL_NOTES: Note[] = [
  { 
    id: 1, 
    title: 'Team Meeting Notes', 
    content: '<p>Key points discussed:</p><ul><li>Project timeline</li><li>Resource allocation</li></ul>',
    tag: 'meeting',
    category: 'project',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 2, 
    title: 'Project Requirements', 
    content: '<p>Requirements gathering for new features:</p><ol><li>User authentication</li><li>Dashboard redesign</li></ol>',
    tag: 'project',
    category: 'project',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

export const INITIAL_GOALS: Goal[] = [];

export const INITIAL_HABITS: Habit[] = [];

export const INITIAL_REFLECTIONS: Reflection[] = [];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 1,
    title: 'React Documentation',
    type: 'course',
    category: 'learning',
    url: 'https://react.dev',
    notes: 'Official React documentation for reference',
    startDate: new Date().toISOString(),
    progress: 0,
    status: 'not-started',
    priority: 'high',
    timeSpent: 0,
    tags: ['react', 'frontend', 'documentation']
  }
];

export const INITIAL_REMINDERS: Reminder[] = [
  {
    id: 1,
    title: 'Weekly Review',
    description: 'Review goals and tasks progress',
    date: new Date().toISOString(),
    type: 'recurring',
    frequency: 'weekly',
    enabled: true,
    taskId: null,
    completed: false,
    category: 'personal-development'
  }
];

export const DEFAULT_WELLNESS_METRICS = {
  mood: 3,
  energy: 3,
  stress: 3,
  sleep: 7
} as const;

export const DEFAULT_WELLNESS_ACTIVITIES = {
  meditation: 0,
  exercise: 0,
  waterIntake: 0,
  nutrition: 3
} as const;

export const MOOD_LABELS = {
  1: 'Very Low',
  2: 'Low',
  3: 'Neutral',
  4: 'Good',
  5: 'Excellent'
} as const;