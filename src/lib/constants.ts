import { TaskTag, MindMap } from '@/types';

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

export const INITIAL_MINDMAPS: MindMap[] = [
  {
    id: 1,
    title: 'Project Planning',
    nodes: [
      { id: 'root', label: 'New Project', x: 400, y: 300, type: 'root' },
      { id: 'n1', label: 'Research', x: 200, y: 150, type: 'branch' },
      { id: 'n2', label: 'Design', x: 600, y: 150, type: 'branch' },
      { id: 'n3', label: 'Development', x: 200, y: 450, type: 'branch' },
      { id: 'n4', label: 'Testing', x: 600, y: 450, type: 'branch' },
      { id: 'n5', label: 'Market Analysis', x: 100, y: 100, type: 'leaf' },
      { id: 'n6', label: 'User Research', x: 300, y: 100, type: 'leaf' },
      { id: 'n7', label: 'UI Design', x: 500, y: 100, type: 'leaf' },
      { id: 'n8', label: 'UX Design', x: 700, y: 100, type: 'leaf' },
    ],
    edges: [
      { source: 'root', target: 'n1' },
      { source: 'root', target: 'n2' },
      { source: 'root', target: 'n3' },
      { source: 'root', target: 'n4' },
      { source: 'n1', target: 'n5' },
      { source: 'n1', target: 'n6' },
      { source: 'n2', target: 'n7' },
      { source: 'n2', target: 'n8' },
    ]
  },
  {
    id: 2,
    title: 'Feature Brainstorming',
    nodes: [
      { id: 'root', label: 'Features', x: 400, y: 300, type: 'root' },
      { id: 'n1', label: 'User Auth', x: 200, y: 200, type: 'branch' },
      { id: 'n2', label: 'Dashboard', x: 600, y: 200, type: 'branch' },
      { id: 'n3', label: 'Settings', x: 400, y: 500, type: 'branch' },
      { id: 'n4', label: 'Login', x: 100, y: 150, type: 'leaf' },
      { id: 'n5', label: 'Register', x: 300, y: 150, type: 'leaf' },
      { id: 'n6', label: 'Stats', x: 500, y: 150, type: 'leaf' },
      { id: 'n7', label: 'Charts', x: 700, y: 150, type: 'leaf' },
    ],
    edges: [
      { source: 'root', target: 'n1' },
      { source: 'root', target: 'n2' },
      { source: 'root', target: 'n3' },
      { source: 'n1', target: 'n4' },
      { source: 'n1', target: 'n5' },
      { source: 'n2', target: 'n6' },
      { source: 'n2', target: 'n7' },
    ]
  }
]; 