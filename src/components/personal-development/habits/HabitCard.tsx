'use client';

import React from 'react';
import { Habit } from '@/types';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Progress,
  Badge,
  Checkbox,
} from "@/components/ui";
import {
  Calendar,
  Clock,
  BarChart2,
  Flame,
  MoreVertical,
  Sun,
  Sunset,
  Moon,
} from 'lucide-react';
import { format, isToday, startOfWeek, endOfWeek, eachDayOfInterval, isWithinInterval } from 'date-fns';

interface HabitCardProps {
  habit: Habit;
  onComplete: () => void;
  onUpdate: (updates: Partial<Habit>) => void;
}

const TimeOfDayIcon = {
  morning: Sun,
  afternoon: Sunset,
  evening: Moon,
  anytime: Clock,
};

export function HabitCard({ habit, onComplete, onUpdate }: HabitCardProps) {
  const {
    title,
    description,
    frequency,
    timeOfDay = 'anytime',
    streak,
    completedDates,
    category
  } = habit;

  // Calculate completion status for today
  const isCompletedToday = completedDates.includes(new Date().toISOString().split('T')[0]);

  // Calculate week's progress
  const calculateWeekProgress = () => {
    const start = startOfWeek(new Date());
    const end = endOfWeek(new Date());
    const daysInWeek = eachDayOfInterval({ start, end });
    
    const completedThisWeek = completedDates.filter(date => 
      isWithinInterval(new Date(date), { start, end })
    ).length;

    return {
      completed: completedThisWeek,
      total: frequency === 'daily' ? 7 : frequency === 'weekly' ? 1 : 0,
      percentage: frequency === 'daily' 
        ? Math.round((completedThisWeek / 7) * 100)
        : frequency === 'weekly' && completedThisWeek > 0 ? 100 : 0
    };
  };

  const weekProgress = calculateWeekProgress();
  const TimeIcon = TimeOfDayIcon[timeOfDay];

  const categoryColors: Record<string, string> = {
    learning: 'bg-blue-500',
    wellness: 'bg-green-500',
    'skill-building': 'bg-purple-500',
    habits: 'bg-yellow-500',
    reading: 'bg-indigo-500',
    other: 'bg-gray-500'
  };

  return (
    <Card className={isCompletedToday ? 'border-green-500' : ''}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{title}</h3>
            <Badge className={categoryColors[category]}>
              {category}
            </Badge>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <TimeIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Streak and Frequency Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span>{streak} day streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="capitalize">{frequency}</span>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">This week</span>
              <span className="font-medium">{weekProgress.completed}/{weekProgress.total}</span>
            </div>
            <Progress value={weekProgress.percentage} />
          </div>

          {/* Completion Button */}
          <div className="flex items-center justify-between">
            <Checkbox
              checked={isCompletedToday}
              onCheckedChange={() => onComplete()}
              className="mr-2"
            />
            <span className="flex-1 text-sm">
              {isCompletedToday ? 'Completed today' : 'Mark as complete'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HabitCard;