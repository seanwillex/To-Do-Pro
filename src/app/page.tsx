'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskStats } from '@/components/tasks/TaskStats';
import { NoteList } from '@/components/notes/NoteList';
import { TaskDetails } from '@/components/tasks/TaskDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task, Note, Doc, Goal, TimeEntry, Reminder } from '@/types';
import { INITIAL_TASKS, INITIAL_NOTES } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Footer } from '@/components/layout/Footer';
import { DocList } from '@/components/docs/DocList';
import { GoalList } from '@/components/goals/GoalList';
import { TimeTrackingView } from '@/components/time/TimeTrackingView';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { ReminderList } from '@/components/reminders/ReminderList';

const INITIAL_DOCS: Doc[] = [
  {
    id: 1,
    title: 'Getting Started Guide',
    content: '<h2>Welcome to To-do Pro</h2><p>This guide will help you get started...</p>',
    category: 'guide',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Project Documentation',
    content: '<h2>Project Overview</h2><p>Key project details and guidelines...</p>',
    category: 'documentation',
    lastUpdated: new Date().toISOString()
  }
];

const INITIAL_GOALS = [
  {
    id: 1,
    title: 'Complete Project MVP',
    description: 'Deliver the minimum viable product with core features',
    deadline: '2024-03-31',
    progress: 60,
    status: 'in-progress' as const,
    milestones: [
      {
        id: 1,
        goalId: 1,
        title: 'Design Phase',
        dueDate: '2024-02-28',
        completed: true,
        description: 'Complete UI/UX design'
      },
      {
        id: 2,
        goalId: 1,
        title: 'Development Phase',
        dueDate: '2024-03-15',
        completed: false,
        description: 'Implement core features'
      }
    ]
  }
];

const INITIAL_TIME_ENTRIES: TimeEntry[] = [];

const INITIAL_REMINDERS: Reminder[] = [
  {
    id: 1,
    taskId: 1,
    title: 'Project Meeting',
    description: 'Team sync-up for project status',
    dueDate: '2024-02-15',
    dueTime: '10:00',
    status: 'pending',
    priority: 'high',
    repeat: 'weekly'
  }
];

export default function HomePage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', INITIAL_TASKS);
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', INITIAL_NOTES);
  const [docs, setDocs] = useLocalStorage<Doc[]>('docs', INITIAL_DOCS);
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', INITIAL_GOALS);
  const [timeEntries, setTimeEntries] = useLocalStorage<TimeEntry[]>('time-entries', INITIAL_TIME_ENTRIES);
  const [reminders, setReminders] = useLocalStorage<Reminder[]>('reminders', INITIAL_REMINDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState('tasks');

  const filteredTasks = tasks.filter((task: Task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNotes = notes.filter((note: Note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDocs = docs.filter((doc: Doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGoals = goals.filter((goal: Goal) =>
    goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTimeEntries = timeEntries.filter((entry: TimeEntry) =>
    entry.description.includes(searchTerm.toLowerCase())
  );

  const filteredReminders = reminders.filter((reminder: Reminder) =>
    reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reminder.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateTaskTag = (id: number, tag: Task['tag']) => {
    setTasks(tasks.map((task: Task) =>
      task.id === id ? { ...task, tag } : task
    ));
  };

  const updateNoteContent = (id: number, content: string) => {
    setNotes(notes.map((note: Note) =>
      note.id === id ? { ...note, content } : note
    ));
  };

  const updateDocContent = (id: number, content: string) => {
    setDocs(docs.map((doc: Doc) =>
      doc.id === id ? { ...doc, content, lastUpdated: new Date().toISOString() } : doc
    ));
  };

  const updateGoal = (id: number, updates: Partial<Goal>) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const addTimeEntry = (entry: TimeEntry) => {
    setTimeEntries(prev => [...prev, entry]);
  };

  const updateReminder = (id: number, updates: Partial<Reminder>) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, ...updates } : reminder
    ));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="pt-14 flex flex-1">
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
          }}
        />

        <main className={`flex-1 transition-all duration-200 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="p-6 max-w-6xl mx-auto">
            <TaskStats tasks={tasks} />
            
            <div className="mt-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="docs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    Docs
                  </TabsTrigger>
                  <TabsTrigger value="goals" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    Goals
                  </TabsTrigger>
                  <TabsTrigger value="time" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    Time Tracking
                  </TabsTrigger>
                  <TabsTrigger value="reminders" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    Reminders
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                  <Dashboard
                    tasks={tasks}
                    notes={notes}
                    timeEntries={timeEntries}
                  />
                </TabsContent>

                <TabsContent value="tasks">
                  <TaskList
                    tasks={filteredTasks}
                    setTasks={setTasks}
                    updateTaskTag={updateTaskTag}
                    setSelectedTask={setSelectedTask}
                  />
                </TabsContent>

                <TabsContent value="notes">
                  <NoteList
                    notes={filteredNotes}
                    setNotes={setNotes}
                    updateNoteContent={updateNoteContent}
                  />
                </TabsContent>

                <TabsContent value="docs">
                  <DocList
                    docs={filteredDocs}
                    setDocs={setDocs}
                    updateDocContent={updateDocContent}
                  />
                </TabsContent>

                <TabsContent value="goals">
                  <GoalList
                    goals={goals}
                    setGoals={setGoals}
                    updateGoal={updateGoal}
                  />
                </TabsContent>

                <TabsContent value="time">
                  <TimeTrackingView
                    tasks={tasks}
                    timeEntries={timeEntries}
                    onTimeEntry={addTimeEntry}
                  />
                </TabsContent>

                <TabsContent value="reminders">
                  <ReminderList
                    reminders={filteredReminders}
                    tasks={tasks}
                    setReminders={setReminders}
                    updateReminder={updateReminder}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>

        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </div>

      <Footer />
    </div>
  );
} 