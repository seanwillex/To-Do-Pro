'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskStats } from '@/components/tasks/TaskStats';
import { NoteList } from '@/components/notes/NoteList';
import { TaskDetails } from '@/components/tasks/TaskDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task, Note, Doc, Goal, TimeEntry, Reminder, Habit, Reflection, Resource, TaskCategory } from '@/types';
import { 
  INITIAL_TASKS, 
  INITIAL_NOTES, 
  INITIAL_DOCS, 
  INITIAL_GOALS,
  INITIAL_HABITS,
  INITIAL_REFLECTIONS,
  INITIAL_RESOURCES
} from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Footer } from '@/components/layout/Footer';
import { DocList } from '@/components/docs/DocList';
import { GoalList } from '@/components/goals/GoalList';
import { TimeTrackingView } from '@/components/time/TimeTrackingView';
import { PersonalDevDashboard } from '@/components/personal-development/dashboard/PersonalDevDashboard';
import { HabitList } from '@/components/personal-development/habits/HabitList';
import { ReflectionList } from '@/components/personal-development/reflection/ReflectionList';
import { ResourceLibrary } from '@/components/personal-development/learning/ResourceLibrary';
import { WellnessTracker } from '@/components/personal-development/wellness/WellnessTracker';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { ReminderList } from '@/components/reminders/ReminderList';

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
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', INITIAL_HABITS);
  const [reflections, setReflections] = useLocalStorage<Reflection[]>('reflections', INITIAL_REFLECTIONS);
  const [resources, setResources] = useLocalStorage<Resource[]>('resources', INITIAL_RESOURCES);
  const [timeEntries, setTimeEntries] = useLocalStorage<TimeEntry[]>('time-entries', []);
  const [reminders, setReminders] = useLocalStorage<Reminder[]>('reminders', INITIAL_REMINDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const filterBySearchTerm = <T extends { title: string }>(items: T[]): T[] => {
    return items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredTasks = filterBySearchTerm(tasks);
  const filteredNotes = filterBySearchTerm(notes);
  const filteredDocs = filterBySearchTerm(docs);
  const filteredGoals = filterBySearchTerm(goals);
  const filteredHabits = filterBySearchTerm(habits);
  const filteredReflections = filterBySearchTerm(reflections);
  const filteredResources = filterBySearchTerm(resources);
  const filteredReminders = filterBySearchTerm(reminders);

  const updateTaskTag = (id: number, tag: Task['tag']) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, tag } : task
    ));
  };

  const updateTaskCategory = (id: number, category: TaskCategory) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, category } : task
    ));
  };

  const updateNoteContent = (id: number, content: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, content } : note
    ));
  };

  const updateDocContent = (id: number, content: string) => {
    setDocs(docs.map(doc =>
      doc.id === id ? { ...doc, content, lastUpdated: new Date().toISOString() } : doc
    ));
  };

  const updateGoal = (id: number, updates: Partial<Goal>) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const updateHabit = (id: number, updates: Partial<Habit>) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const updateReflection = (id: number, updates: Partial<Reflection>) => {
    setReflections(reflections.map(reflection =>
      reflection.id === id ? { ...reflection, ...updates } : reflection
    ));
  };

  const updateResource = (id: number, updates: Partial<Resource>) => {
    setResources(resources.map(resource =>
      resource.id === id ? { ...resource, ...updates } : resource
    ));
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
          onTabChange={setActiveTab}
        />

        <main className={`flex-1 transition-all duration-200 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="p-6 max-w-6xl mx-auto">
            <TaskStats tasks={tasks} />
            
            <div className="mt-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="dashboard">
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="personal-dev">
                    Personal Growth
                  </TabsTrigger>
                  <TabsTrigger value="tasks">
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger value="habits">
                    Habits
                  </TabsTrigger>
                  <TabsTrigger value="reflection">
                    Reflection
                  </TabsTrigger>
                  <TabsTrigger value="learning">
                    Learning
                  </TabsTrigger>
                  <TabsTrigger value="wellness">
                    Wellness
                  </TabsTrigger>
                  <TabsTrigger value="notes">
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="goals">
                    Goals
                  </TabsTrigger>
                  <TabsTrigger value="time">
                    Time
                  </TabsTrigger>
                  <TabsTrigger value="reminders">
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

                <TabsContent value="personal-dev">
                  <PersonalDevDashboard
                    tasks={tasks}
                    goals={goals}
                    habits={habits}
                    reflections={reflections}
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

                <TabsContent value="habits">
                  <HabitList
                    habits={filteredHabits}
                    setHabits={setHabits}
                    updateHabit={updateHabit}
                  />
                </TabsContent>

                <TabsContent value="reflection">
                  <ReflectionList
                    reflections={filteredReflections}
                    setReflections={setReflections}
                    updateReflection={updateReflection}
                  />
                </TabsContent>

                <TabsContent value="learning">
                  <ResourceLibrary
                    resources={filteredResources}
                    setResources={setResources}
                    updateResource={updateResource}
                  />
                </TabsContent>

                <TabsContent value="wellness">
                  <WellnessTracker
                    tasks={tasks}
                    habits={habits}
                    timeEntries={timeEntries}
                  />
                </TabsContent>

                <TabsContent value="notes">
                  <NoteList
                    notes={filteredNotes}
                    setNotes={setNotes}
                    updateNoteContent={updateNoteContent}
                  />
                </TabsContent>

                <TabsContent value="goals">
                  <GoalList
                    goals={filteredGoals}
                    setGoals={setGoals}
                    updateGoal={updateGoal}
                  />
                </TabsContent>

                <TabsContent value="time">
                  <TimeTrackingView
                    tasks={tasks}
                    timeEntries={timeEntries}
                    onTimeEntry={(entry) => setTimeEntries(prev => [...prev, entry])}
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