'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskStats } from '@/components/tasks/TaskStats';
import { NoteList } from '@/components/notes/NoteList';
import { TaskDetails } from '@/components/tasks/TaskDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task, Note, Goal, Reminder, Habit, Reflection, Resource, TimeEntry } from '@/types';
import { 
  INITIAL_TASKS, 
  INITIAL_NOTES, 
  INITIAL_GOALS,
  INITIAL_HABITS,
  INITIAL_REFLECTIONS,
  INITIAL_RESOURCES,
  INITIAL_REMINDERS
} from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Footer } from '@/components/layout/Footer';
import { GoalList } from '@/components/goals/GoalList';
import { PersonalDevDashboard } from '@/components/personal-development/dashboard/PersonalDevDashboard';
import { HabitList } from '@/components/personal-development/habits/HabitList';
import { WellnessTracker } from '@/components/personal-development/wellness/WellnessTracker';
import { ResourceLibrary } from '@/components/personal-development/learning/ResourceLibrary';
import { ReflectionList } from '@/components/personal-development/reflection/ReflectionList';
import { ReminderList } from '@/components/reminders/ReminderList';
import { 
  CheckCircle2, 
  Activity, 
  Target, 
  BookOpen,
  Brain,
  Trophy,
  Clock,
  Battery
} from 'lucide-react';
import { StatsCard } from '@/components/ui/stats-card';
import { HabitProgress } from '@/components/personal-development/habits/HabitProgress';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { GoalTracker } from '@/components/personal-development/goals/GoalTracker';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Local storage hooks
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', INITIAL_TASKS);
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', INITIAL_NOTES);
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', INITIAL_GOALS);
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', INITIAL_HABITS);
  const [reflections, setReflections] = useLocalStorage<Reflection[]>('reflections', INITIAL_REFLECTIONS);
  const [resources, setResources] = useLocalStorage<Resource[]>('resources', INITIAL_RESOURCES);
  const [reminders, setReminders] = useLocalStorage<Reminder[]>('reminders', INITIAL_REMINDERS);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Update handlers
  const updateTaskTag = (id: number, tag: Task['tag']) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, tag } : task
    ));
  };

  const updateNoteContent = (id: number, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, content } : note
    ));
  };

  const updateGoal = (id: number, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const updateHabit = (id: number, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit =>
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const updateResource = (id: number, updates: Partial<Resource>) => {
    setResources(prev => prev.map(resource =>
      resource.id === id ? { ...resource, ...updates } : resource
    ));
  };

  const updateReflection = (id: number, updates: Partial<Reflection>) => {
    setReflections(prev => prev.map(reflection =>
      reflection.id === id ? { ...reflection, ...updates } : reflection
    ));
  };

  const updateReminder = (id: number, updates: Partial<Reminder>) => {
    setReminders(prev => prev.map(reminder =>
      reminder.id === id ? { ...reminder, ...updates } : reminder
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="flex flex-1">
        <Sidebar 
          sidebarOpen={sidebarOpen}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <main className={`flex-1 pt-14 ${sidebarOpen ? 'pl-64' : 'pl-0'} transition-all duration-200`}>
          <div className="container mx-auto p-6 min-h-[calc(100vh-theme(spacing.14)-theme(spacing.16))]">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Overview Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard 
                    title="Active Tasks" 
                    value={tasks.filter(t => !t.completed).length} 
                    icon={CheckCircle2} 
                  />
                  <StatsCard 
                    title="Habits Tracked" 
                    value={habits.length} 
                    icon={Activity} 
                  />
                  <StatsCard 
                    title="Goals Set" 
                    value={goals.length} 
                    icon={Target} 
                  />
                  <StatsCard 
                    title="Reflections" 
                    value={reflections.length} 
                    icon={BookOpen} 
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TaskStats tasks={tasks} />
                  <HabitProgress habits={habits} />
                </div>
                <RecentActivities 
                  tasks={tasks}
                  habits={habits}
                  reflections={reflections}
                />
              </div>
            )}
            {activeTab === 'tasks' && (
              <div className="space-y-4">
                <TaskStats tasks={tasks} />
                <TaskList 
                  tasks={tasks} 
                  setTasks={setTasks}
                  updateTaskTag={updateTaskTag}
                  setSelectedTask={setSelectedTask}
                />
              </div>
            )}
            {activeTab === 'notes' && <NoteList notes={notes} setNotes={setNotes} updateNoteContent={updateNoteContent} />}
            {activeTab === 'goals' && <GoalList goals={goals} setGoals={setGoals} updateGoal={updateGoal} />}
            {activeTab === 'habits' && (
              <HabitList 
                habits={habits} 
                setHabits={setHabits} 
                updateHabit={updateHabit} 
              />
            )}
            {activeTab === 'personal-dev' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Personal Development</h1>
                <Tabs defaultValue="goals" className="w-full">
                  <TabsList>
                    <TabsTrigger value="goals">Goals</TabsTrigger>
                    <TabsTrigger value="habits">Habits</TabsTrigger>
                    <TabsTrigger value="learning">Learning</TabsTrigger>
                  </TabsList>
                  <TabsContent value="goals">
                    <GoalTracker 
                      goals={goals}
                      setGoals={setGoals}
                      updateGoal={updateGoal}
                    />
                  </TabsContent>
                  <TabsContent value="habits">
                    <HabitList 
                      habits={habits}
                      setHabits={setHabits}
                      updateHabit={updateHabit}
                    />
                  </TabsContent>
                  <TabsContent value="learning">
                    <ResourceLibrary 
                      resources={resources}
                      setResources={setResources}
                      updateResource={updateResource}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            )}
            {activeTab === 'wellness' && (
              <WellnessTracker 
                tasks={tasks} 
                habits={habits}
                timeEntries={timeEntries}
              />
            )}
            {activeTab === 'resources' && (
              <ResourceLibrary 
                resources={resources} 
                setResources={setResources} 
                updateResource={updateResource} 
              />
            )}
            {activeTab === 'reflections' && (
              <ReflectionList 
                reflections={reflections} 
                setReflections={setReflections} 
                updateReflection={updateReflection} 
              />
            )}
            {activeTab === 'reminders' && (
              <ReminderList 
                reminders={reminders} 
                setReminders={setReminders} 
                updateReminder={updateReminder}
                tasks={tasks} 
              />
            )}
          </div>
        </main>
      </div>
      <Footer className="h-16 bg-background border-t" />
      {selectedTask && (
        <TaskDetails 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </div>
  );
}