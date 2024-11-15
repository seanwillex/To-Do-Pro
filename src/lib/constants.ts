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

export const INITIAL_TASKS: Task[] = [
  { 
    id: 1, 
    title: 'Design new landing page', 
    completed: false, 
    dueDate: '2024-02-15',
    tag: 'in-progress',
    category: 'project',
    description: 'Create a modern and engaging landing page design',
    tags: ['design', 'frontend']
  },
  { 
    id: 2, 
    title: 'Update user documentation', 
    completed: true, 
    dueDate: '2024-02-10',
    tag: 'completed',
    category: 'learning',
    description: 'Review and update all user-facing documentation',
    tags: ['documentation']
  },
  { 
    id: 3, 
    title: 'Fix authentication bugs', 
    completed: false, 
    dueDate: '2024-02-20',
    tag: 'urgent',
    category: 'project',
    description: 'Address reported authentication issues',
    tags: ['backend', 'security']
  },
];

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

export const INITIAL_GOALS: Goal[] = [
  {
    id: 1,
    title: 'Master React Development',
    description: 'Become proficient in React and its ecosystem',
    category: 'learning',
    deadline: '2024-06-30',
    progress: 60,
    status: 'in-progress',
    milestones: [
      {
        id: 1,
        goalId: 1,
        title: 'Complete React Basics',
        dueDate: '2024-03-31',
        completed: true,
        description: 'Master fundamental React concepts'
      },
      {
        id: 2,
        goalId: 1,
        title: 'Build Portfolio Projects',
        dueDate: '2024-05-15',
        completed: false,
        description: 'Create three substantial React projects'
      }
    ],
    reflections: [],
    resources: []
  }
];

export const INITIAL_HABITS: Habit[] = [
  {
    id: 1,
    title: 'Morning Meditation',
    description: 'Daily 15-minute meditation practice',
    frequency: 'daily',
    timeOfDay: 'morning',
    status: 'active',
    streak: 0,
    completedDates: [],
    category: 'wellness',
    created: new Date().toISOString(),
    reminder: {
      enabled: false
    },
    progress: {
      thisWeek: 0,
      thisMonth: 0,
      allTime: 0
    }
  }
];

export const INITIAL_REFLECTIONS: Reflection[] = [
  {
    id: 1,
    title: 'Weekly Progress Review',
    date: new Date().toISOString(),
    content: 'Initial reflection on personal growth journey',
    mood: 'positive',
    learnings: ['Started meditation practice', 'Improved focus'],
    nextSteps: ['Increase meditation duration', 'Add journaling habit'],
    category: 'reflection',
    tags: ['meditation', 'productivity']
  }
];

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