'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Progress } from "@/components/ui";
import { Brain, Target, BookOpen, Trophy, Clock, Battery, Activity, Flame, BookOpen as BookIcon, CheckCircle2 } from 'lucide-react';
import { Task, Goal, TimeEntry, Habit, Reflection } from '@/types';
import { format, startOfWeek, isWithinInterval, startOfDay, endOfDay, isToday } from 'date-fns';

interface PersonalDevDashboardProps {
  tasks: Task[];
  goals: Goal[];
  habits?: Habit[];
  reflections?: Reflection[];
  timeEntries: TimeEntry[];
}

export function PersonalDevDashboard({
  tasks,
  goals,
  habits = [],
  reflections = [],
  timeEntries
}: PersonalDevDashboardProps) {
  // Calculate metrics for different categories
  const calculateCategoryMetrics = (category: Task['category']) => {
    const categoryTasks = tasks.filter(t => t.category === category);
    const completed = categoryTasks.filter(t => t.completed).length;
    const total = categoryTasks.length;

    const categoryGoals = goals.filter(g => g.category === category);
    const goalProgress = categoryGoals.length > 0
      ? Math.round(categoryGoals.reduce((acc, goal) => acc + goal.progress, 0) / categoryGoals.length)
      : 0;

    const categoryHabits = habits.filter(h => h.category === category);
    const activeHabits = categoryHabits.filter(h => h.streak > 0).length;

    const timeSpent = timeEntries
      .filter(entry => {
        const task = tasks.find(t => t.id === entry.taskId);
        return task?.category === category;
      })
      .reduce((acc, entry) => acc + entry.duration, 0);

    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      goalProgress,
      activeHabits,
      timeSpent
    };
  };

  // Calculate category-specific metrics
  const learningMetrics = calculateCategoryMetrics('learning');
  const wellnessMetrics = calculateCategoryMetrics('wellness');
  const skillBuildingMetrics = calculateCategoryMetrics('skill-building');

  // Calculate overall activity streak
  const getActivityStreak = () => {
    let streak = 0;
    const today = new Date();

    // Check if there's any activity today
    const hasActivityToday = [...tasks, ...habits].some(item => {
      if ('completedDates' in item) {
        return item.completedDates.some(date => isToday(new Date(date)));
      }
      return item.completed && item.completedAt && isToday(new Date(item.completedAt));
    });

    if (!hasActivityToday) return 0;

    // Count consecutive days backwards
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStart = startOfDay(checkDate);
      const dateEnd = endOfDay(checkDate);

      const hasActivity = [...tasks, ...habits].some(item => {
        if ('completedDates' in item) {
          return item.completedDates.some(date =>
            isWithinInterval(new Date(date), { start: dateStart, end: dateEnd })
          );
        }
        return item.completed && item.completedAt &&
          isWithinInterval(new Date(item.completedAt), { start: dateStart, end: dateEnd });
      });

      if (hasActivity) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const activityStreak = getActivityStreak();

  // Calculate recent reflections
  const recentReflections = React.useMemo(() => {
    const weekStart = startOfWeek(new Date());
    return {
      total: reflections.length,
      thisWeek: reflections.filter(r => 
        isWithinInterval(new Date(r.date), {
          start: weekStart,
          end: new Date()
        })
      ).length
    };
  }, [reflections]);

  // Get active goals
  const activeGoals = goals.filter(goal => goal.status === 'in-progress');

  return (
    <div className="space-y-8">
      {/* Main Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-glow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
            <Brain className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningMetrics.percentage}%</div>
            <Progress value={learningMetrics.percentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {learningMetrics.completed} of {learningMetrics.total} learning tasks completed
            </p>
          </CardContent>
        </Card>

        <Card className="hover-glow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Skill Building</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillBuildingMetrics.goalProgress}%</div>
            <Progress value={skillBuildingMetrics.goalProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {skillBuildingMetrics.activeHabits} active practice habits
            </p>
          </CardContent>
        </Card>

        <Card className="hover-glow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Activity Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityStreak} days</div>
            <Progress value={(activityStreak / 30) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Keep the momentum going!
            </p>
          </CardContent>
        </Card>

        <Card className="hover-glow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wellnessMetrics.percentage}%</div>
            <Progress value={wellnessMetrics.percentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {wellnessMetrics.completed} wellness activities completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Goals and Activities */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Active Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeGoals.slice(0, 3).map(goal => (
                <div key={goal.id} className="flex items-center gap-4">
                  <Target className="h-4 w-4 text-purple-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{goal.title}</p>
                    <Progress value={goal.progress} className="mt-1 h-1" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {goal.progress}%
                  </span>
                </div>
              ))}
              {activeGoals.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No active goals. Set some goals to track your progress!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookIcon className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Reflections</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {recentReflections.thisWeek} this week
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Learning Time</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round(learningMetrics.timeSpent / 60)}h this week
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Active Habits</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {habits.filter(h => h.streak > 0).length} habits on streak
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PersonalDevDashboard;