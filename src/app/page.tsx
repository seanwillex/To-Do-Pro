'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskStats } from '@/components/tasks/TaskStats';
import { NoteList } from '@/components/notes/NoteList';
import { TaskDetails } from '@/components/tasks/TaskDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task, Note, Doc } from '@/types';
import { INITIAL_TASKS, INITIAL_NOTES } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from '@/components/layout/Footer';
import { DocList } from '@/components/docs/DocList';

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

export default function HomePage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', INITIAL_TASKS);
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', INITIAL_NOTES);
  const [docs, setDocs] = useLocalStorage<Doc[]>('docs', INITIAL_DOCS);
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

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background flex flex-col">
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
                    <TabsTrigger value="tasks" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                      Tasks
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                      Notes
                    </TabsTrigger>
                    <TabsTrigger value="docs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                      Docs
                    </TabsTrigger>
                  </TabsList>

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
    </ThemeProvider>
  );
} 