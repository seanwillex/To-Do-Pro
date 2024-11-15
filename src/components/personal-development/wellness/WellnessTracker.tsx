'use client';

import React, { useState } from 'react';
import { Task, Habit, TimeEntry, WellnessLog, WellnessMetrics, WellnessActivities } from '@/types';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Button,
  Progress,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  Activity,
  Moon,
  Sun,
  Droplets,
  Heart,
  Brain,
  Plus,
  Calendar,
} from 'lucide-react';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface WellnessTrackerProps {
  tasks: Task[];
  habits: Habit[];
  timeEntries: TimeEntry[];
}

type MoodRating = 1 | 2 | 3 | 4 | 5;

const INITIAL_METRICS: WellnessMetrics = {
  mood: 3,
  energy: 3,
  stress: 3,
  sleep: 7
};

const INITIAL_ACTIVITIES: WellnessActivities = {
  meditation: 0,
  exercise: 0,
  waterIntake: 0,
  nutrition: 3
};

const DEFAULT_LOG: WellnessLog = {
  id: 0,
  date: new Date().toISOString(),
  metrics: INITIAL_METRICS,
  activities: INITIAL_ACTIVITIES,
  notes: '',
  tags: []
};

const MOOD_LABELS: Record<MoodRating, string> = {
  1: 'Very Low',
  2: 'Low',
  3: 'Neutral',
  4: 'Good',
  5: 'Excellent'
};

export function WellnessTracker({
  tasks,
  habits,
  timeEntries
}: WellnessTrackerProps) {
  const [logs, setLogs] = useLocalStorage<WellnessLog[]>('wellness-logs', []);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newLog, setNewLog] = React.useState<WellnessLog>({
    ...DEFAULT_LOG,
    id: Date.now()
  });

  const updateMetric = <K extends keyof WellnessMetrics>(field: K, value: WellnessMetrics[K]) => {
    setNewLog(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [field]: value
      }
    }));
  };

  const updateActivity = <K extends keyof WellnessActivities>(field: K, value: WellnessActivities[K]) => {
    setNewLog(prev => ({
      ...prev,
      activities: {
        ...prev.activities,
        [field]: value
      }
    }));
  };

  const addLog = () => {
    setLogs(prev => [...prev, { ...newLog, id: Date.now() }]);
    setIsDialogOpen(false);
    setNewLog({
      ...DEFAULT_LOG,
      id: Date.now()
    });
  };

  const calculateWeeklyStats = () => {
    const start = startOfWeek(new Date());
    const end = endOfWeek(new Date());
    const weekLogs = logs.filter(log => 
      isWithinInterval(new Date(log.date), { start, end })
    );

    const total = weekLogs.length || 1;
    const stats = weekLogs.reduce((acc, log) => ({
      mood: acc.mood + log.metrics.mood,
      energy: acc.energy + log.metrics.energy,
      stress: acc.stress + log.metrics.stress,
      sleep: acc.sleep + log.metrics.sleep,
      meditation: acc.meditation + (log.activities.meditation || 0),
      exercise: acc.exercise + (log.activities.exercise || 0),
      waterIntake: acc.waterIntake + (log.activities.waterIntake || 0),
      nutrition: acc.nutrition + log.activities.nutrition
    }), {
      mood: 0,
      energy: 0,
      stress: 0,
      sleep: 0,
      meditation: 0,
      exercise: 0,
      waterIntake: 0,
      nutrition: 0
    });

    // Calculate averages
    return {
      mood: stats.mood / total,
      energy: stats.energy / total,
      stress: stats.stress / total,
      sleep: stats.sleep / total,
      meditation: stats.meditation / total,
      exercise: stats.exercise / total,
      waterIntake: stats.waterIntake / total,
      nutrition: stats.nutrition / total
    };
  };

  const weeklyStats = calculateWeeklyStats();
  const wellnessHabits = habits.filter(h => h.category === 'wellness');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Wellness Tracker</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Log Wellness
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Daily Wellness Log</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Mood (1-5)</Label>
                <Select
                  value={newLog.metrics.mood.toString()}
                  onValueChange={(value) =>
                    updateMetric('mood', parseInt(value) as MoodRating)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(MOOD_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Sleep (hours)</Label>
                <Input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={newLog.metrics.sleep}
                  onChange={(e) =>
                    updateMetric('sleep', parseFloat(e.target.value))
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Exercise (minutes)</Label>
                <Input
                  type="number"
                  min="0"
                  value={newLog.activities.exercise}
                  onChange={(e) =>
                    updateActivity('exercise', parseInt(e.target.value))
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Meditation (minutes)</Label>
                <Input
                  type="number"
                  min="0"
                  value={newLog.activities.meditation}
                  onChange={(e) =>
                    updateActivity('meditation', parseInt(e.target.value))
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Water Intake (glasses)</Label>
                <Input
                  type="number"
                  min="0"
                  value={newLog.activities.waterIntake}
                  onChange={(e) =>
                    updateActivity('waterIntake', parseInt(e.target.value))
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Notes (optional)</Label>
                <Textarea
                  value={newLog.notes}
                  onChange={(e) =>
                    setNewLog(prev => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="How are you feeling today?"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={addLog}>Save Log</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
            <Moon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.sleep.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground mt-2">
              Average sleep this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Exercise</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(weeklyStats.exercise)}m
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Daily exercise average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Mindfulness</CardTitle>
            <Brain className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(weeklyStats.meditation)}m
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Daily meditation average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hydration</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(weeklyStats.waterIntake)} glasses
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Daily water intake average
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Wellness Habits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wellnessHabits.map(habit => (
                <div key={habit.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{habit.title}</span>
                  </div>
                  <Badge>
                    {habit.streak} day streak
                  </Badge>
                </div>
              ))}
              {wellnessHabits.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No wellness habits tracked yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs.slice(-5).reverse().map(log => (
                <div key={log.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {format(new Date(log.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      Mood: {MOOD_LABELS[log.metrics.mood]}
                    </Badge>
                    <Badge variant="outline">
                      Sleep: {log.metrics.sleep}h
                    </Badge>
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No wellness logs yet. Start tracking today!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WellnessTracker;