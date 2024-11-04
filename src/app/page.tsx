'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TaskList } from '@/components/tasks/TaskList';
import { NoteList } from '@/components/notes/NoteList';
import { TaskDetails } from '@/components/tasks/TaskDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task, Note } from '@/types';
import { INITIAL_TASKS, INITIAL_NOTES } from '@/lib/constants';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([...INITIAL_TASKS]);
  const [notes, setNotes] = useState<Note[]>([...INITIAL_NOTES]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter((task: Task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNotes = notes.filter((note: Note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="pt-14 flex">
        <Sidebar sidebarOpen={sidebarOpen} />

        <main className={`flex-1 transition-all duration-200 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="p-6 max-w-6xl mx-auto">
            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="tasks" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  Notes
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
            </Tabs>
          </div>
        </main>

        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </div>
    </div>
  );
} 