'use client';

import * as React from 'react';
import { Task } from '@/types';
import { AddItemForm } from '@/components/shared/AddItemForm';
import { SortableTask } from './SortableTask';
import { TaskFilters } from './TaskFilters';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTaskTag: (id: number, tag: Task['tag']) => void;
  setSelectedTask: (task: Task | null) => void;
}

export function TaskList({ tasks, setTasks, updateTaskTag, setSelectedTask }: TaskListProps) {
  const [filter, setFilter] = React.useState<Task['tag'] | 'all'>('all');
  const [sortBy, setSortBy] = React.useState<'dueDate' | 'title' | 'status'>('dueDate');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setTasks((items: Task[]) => {
        const oldIndex = items.findIndex((item: Task) => item.id === active.id);
        const newIndex = items.findIndex((item: Task) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredAndSortedTasks = React.useMemo(() => {
    let result = [...tasks];
    
    // Apply filter
    if (filter !== 'all') {
      result = result.filter(task => task.tag === filter);
    }
    
    // Apply sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'dueDate':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'status':
          comparison = a.tag.localeCompare(b.tag);
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return result;
  }, [tasks, filter, sortBy, sortDirection]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      dueDate: new Date().toISOString().split('T')[0],
      tag: 'pending',
      description: ''
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleComplete = (taskId: number, completed: boolean) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed } : task
    ));
  };

  return (
    <div>
      <div className="mb-4">
        <AddItemForm onAdd={addTask} placeholder="Add a new task..." />
      </div>
      
      <TaskFilters
        onFilterChange={setFilter}
        onSortChange={setSortBy}
        onSortDirectionChange={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
        sortDirection={sortDirection}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={filteredAndSortedTasks} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {filteredAndSortedTasks.map(task => (
              <SortableTask
                key={task.id}
                task={task}
                updateTag={updateTaskTag}
                onComplete={handleComplete}
                onClick={() => setSelectedTask(task)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
} 