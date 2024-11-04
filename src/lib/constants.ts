import { TaskTag } from '@/types';

export const TASK_TAGS: Record<TaskTag, string> = {
  'urgent': 'bg-red-500',
  'in-progress': 'bg-yellow-500',
  'completed': 'bg-green-500',
  'pending': 'bg-blue-500'
} as const;

export const INITIAL_TASKS = [
  { 
    id: 1, 
    title: 'Design new landing page', 
    completed: false, 
    dueDate: '2024-02-15',
    tag: 'in-progress' as TaskTag,
    description: 'Create a modern and engaging landing page design'
  },
  { 
    id: 2, 
    title: 'Update user documentation', 
    completed: true, 
    dueDate: '2024-02-10',
    tag: 'completed' as TaskTag,
    description: 'Review and update all user-facing documentation'
  },
  { 
    id: 3, 
    title: 'Fix authentication bugs', 
    completed: false, 
    dueDate: '2024-02-20',
    tag: 'urgent' as TaskTag,
    description: 'Address reported authentication issues'
  },
];

export const INITIAL_NOTES = [
  { 
    id: 1, 
    title: 'Team Meeting Notes', 
    content: '<p>Key points discussed:</p><ul><li>Project timeline</li><li>Resource allocation</li></ul>',
    tag: 'meeting'
  },
  { 
    id: 2, 
    title: 'Project Requirements', 
    content: '<p>Requirements gathering for new features:</p><ol><li>User authentication</li><li>Dashboard redesign</li></ol>',
    tag: 'project'
  },
]; 