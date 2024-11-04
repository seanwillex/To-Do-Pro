'use client';

import * as React from 'react';
import { Checkbox } from "@/components/ui";
import { Task } from '@/types';

interface TaskCheckboxProps {
  task: Task;
  onComplete: (taskId: number, completed: boolean) => void;
}

export function TaskCheckbox({ task, onComplete }: TaskCheckboxProps) {
  return (
    <Checkbox
      checked={task.completed}
      onCheckedChange={(checked: boolean) => onComplete(task.id, checked)}
      className="mr-2"
    />
  );
} 