'use client';

import * as React from 'react';
import { Milestone } from '@/types';
import { AddItemForm } from '@/components/shared/AddItemForm';
import { Checkbox } from '@/components/ui';
import { format } from 'date-fns';

interface MilestoneListProps {
  milestones: Milestone[];
  onAdd: (title: string) => void;
  onUpdate: (id: number, updates: Partial<Milestone>) => void;
}

export function MilestoneList({ milestones, onAdd, onUpdate }: MilestoneListProps) {
  return (
    <div className="space-y-4">
      <AddItemForm onAdd={onAdd} placeholder="Add milestone..." />
      <div className="space-y-2">
        {milestones.map(milestone => (
          <div
            key={milestone.id}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent"
          >
            <Checkbox
              checked={milestone.completed}
              onCheckedChange={(checked) => 
                onUpdate(milestone.id, { completed: checked as boolean })
              }
            />
            <div className="flex-1">
              <p className={milestone.completed ? 'line-through text-muted-foreground' : ''}>
                {milestone.title}
              </p>
              <p className="text-sm text-muted-foreground">
                Due {format(new Date(milestone.dueDate), 'PP')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 