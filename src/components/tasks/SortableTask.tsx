'use client';

import * as React from 'react';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TASK_TAGS } from '@/lib/constants';
import { Clock, Tag } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortableTaskProps {
  task: Task;
  updateTag: (id: number, tag: Task['tag']) => void;
  onClick: () => void;
}

export function SortableTask({ task, updateTag, onClick }: SortableTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border cursor-move hover:shadow-md transition-shadow"
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </span>
          <Badge className={TASK_TAGS[task.tag]}>{task.tag}</Badge>
        </div>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
          <Clock className="h-3 w-3" />
          <span>{task.dueDate}</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
            <Tag className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => updateTag(task.id, 'urgent')}>
            Urgent
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateTag(task.id, 'in-progress')}>
            In Progress
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateTag(task.id, 'completed')}>
            Completed
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateTag(task.id, 'pending')}>
            Pending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 