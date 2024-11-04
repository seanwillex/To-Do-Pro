'use client';

import * as React from 'react';
import { Goal } from '@/types';
import { AddItemForm } from '@/components/shared/AddItemForm';
import { GoalCard } from '@/components/goals/GoalCard';

interface GoalListProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  updateGoal: (id: number, updates: Partial<Goal>) => void;
}

export function GoalList({ goals, setGoals, updateGoal }: GoalListProps) {
  const addGoal = (title: string) => {
    const newGoal: Goal = {
      id: Date.now(),
      title,
      description: '',
      deadline: new Date().toISOString().split('T')[0],
      progress: 0,
      status: 'not-started',
      milestones: []
    };
    setGoals(prev => [...prev, newGoal]);
  };

  return (
    <div>
      <div className="mb-4">
        <AddItemForm onAdd={addGoal} placeholder="Add a new goal..." />
      </div>
      <div className="grid gap-4">
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            updateGoal={updateGoal}
          />
        ))}
      </div>
    </div>
  );
} 