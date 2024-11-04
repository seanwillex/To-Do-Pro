'use client';

import * as React from 'react';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TASK_TAGS } from '@/lib/constants';
import { Clock, MoreVertical } from 'lucide-react';

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetails({ task, onClose }: TaskDetailsProps) {
  return (
    <div className="fixed right-0 top-14 h-[calc(100vh-3.5rem)] w-80 bg-white border-l p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Task Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Title</label>
          <p className="mt-1">{task.title}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <div className="mt-1">
            <Badge className={TASK_TAGS[task.tag]}>{task.tag}</Badge>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Due Date</label>
          <p className="mt-1 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {task.dueDate}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Description</label>
          <p className="mt-1">{task.description}</p>
        </div>
      </div>
    </div>
  );
} 