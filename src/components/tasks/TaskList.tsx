'use client';

import * as React from 'react';
import { Task } from '@/types';
import { AddItemForm } from '@/components/shared/AddItemForm';
import { SortableTask } from './SortableTask';
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

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      dueDate: new Date().toISOString().split('T')[0],
      tag: 'pending',
      description: ''
    };
    setTasks((prev: Task[]) => [...prev, newTask]);
  };

  return (
    <div>
      <div className="mb-4">
        <AddItemForm onAdd={addTask} placeholder="Add a new task..." />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {tasks.map(task => (
              <SortableTask
                key={task.id}
                task={task}
                updateTag={updateTaskTag}
                onClick={() => setSelectedTask(task)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
} 