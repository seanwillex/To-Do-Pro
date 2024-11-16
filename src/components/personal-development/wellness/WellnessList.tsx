'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Progress, Badge } from "@/components/ui";
import { Heart, Smile, Battery, Activity, CheckCircle2 } from 'lucide-react';
import { Habit } from '@/types';

interface WellnessListProps {
  habits: Habit[];
}

export function WellnessList({ habits }: WellnessListProps) {
  const wellnessHabits = habits.filter(h => h.category === 'wellness');

  return (
    <div className="space-y-6">
      {/* Wellness Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500" />
            Wellness Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Your wellness tracking content */}
          <div className="space-y-6">
            {/* Daily Metrics */}
            <div className="space-y-4">
              {/* Mood, Energy, Stress levels */}
              {/* ... similar to the dashboard component ... */}
            </div>

            {/* Active Habits */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Active Wellness Habits</h4>
              {wellnessHabits.map(habit => (
                <div key={habit.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{habit.title}</span>
                  </div>
                  <Badge variant="outline">{habit.streak} days</Badge>
                </div>
              ))}
              {wellnessHabits.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No wellness habits yet. Start tracking your wellness journey!
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 