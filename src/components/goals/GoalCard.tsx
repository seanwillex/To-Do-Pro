'use client';

import * as React from 'react';
import { Goal, Milestone } from '@/types';
import { 
  Card, 
  CardHeader, 
  CardContent,
  Progress,
  Button,
  Badge,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { Plus, Target, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { MilestoneList } from '@/components/milestones/MilestoneList';

interface GoalCardProps {
  goal: Goal;
  updateGoal: (id: number, updates: Partial<Goal>) => void;
}

export function GoalCard({ goal, updateGoal }: GoalCardProps) {
  const addMilestone = (title: string) => {
    const newMilestone: Milestone = {
      id: Date.now(),
      goalId: goal.id,
      title,
      dueDate: new Date().toISOString().split('T')[0],
      completed: false,
      description: ''
    };
    updateGoal(goal.id, {
      milestones: [...goal.milestones, newMilestone]
    });
  };

  const updateMilestone = (milestoneId: number, updates: Partial<Milestone>) => {
    const updatedMilestones = goal.milestones.map(m =>
      m.id === milestoneId ? { ...m, ...updates } : m
    );
    updateGoal(goal.id, { milestones: updatedMilestones });
  };

  const statusColors = {
    'not-started': 'bg-gray-500',
    'in-progress': 'bg-blue-500',
    'completed': 'bg-green-500'
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{goal.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Due {format(new Date(goal.deadline), 'PP')}</span>
            </div>
          </div>
          <Badge className={statusColors[goal.status]}>{goal.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} />
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="milestones">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Milestones ({goal.milestones.length})</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <MilestoneList
                  milestones={goal.milestones}
                  onAdd={addMilestone}
                  onUpdate={updateMilestone}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
} 