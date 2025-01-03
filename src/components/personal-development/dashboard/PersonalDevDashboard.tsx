'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Progress, Badge } from "@/components/ui";
import { Brain, Target, BookOpen, Trophy, Clock, Battery, Activity, Flame, BookOpen as BookIcon, CheckCircle2, Heart, Smile, Tag, TrendingUp, Calendar, Star } from 'lucide-react';
import { Task, Goal, TimeEntry, Habit, Reflection } from '@/types';
import { format, startOfWeek, isWithinInterval, startOfDay, endOfDay, isToday } from 'date-fns';

interface PersonalDevDashboardProps {
  tasks: Task[];
  goals: Goal[];
  habits?: Habit[];
  reflections?: Reflection[];
  timeEntries: TimeEntry[];
}

interface WellnessMetrics {
  completed: number;
  total: number;
  percentage: number;
  goalProgress: number;
  activeHabits: number;
  timeSpent: number;
  mood: number;
  energy: number;
  stress: number;
  weeklyProgress: number;
  monthlyProgress: number;
}

export function PersonalDevDashboard({
  tasks,
  goals,
  habits = [],
  reflections = [],
  timeEntries
}: PersonalDevDashboardProps) {
  // Calculate metrics for different categories
  const calculateCategoryMetrics = (category: Task['category']): WellnessMetrics => {
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

    // Calculate weekly and monthly progress
    const today = new Date();
    const weekStart = startOfWeek(today);
    
    const weeklyActivities = categoryHabits
      .filter(h => h.completedDates.some(date => 
        isWithinInterval(new Date(date), { start: weekStart, end: today })
      ));

    const monthlyActivities = categoryHabits
      .filter(h => h.completedDates.length > 0);

    const weeklyProgress = categoryHabits.length > 0
      ? (weeklyActivities.length / categoryHabits.length) * 100
      : 0;

    const monthlyProgress = categoryHabits.length > 0
      ? (monthlyActivities.length / categoryHabits.length) * 100
      : 0;

    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      goalProgress,
      activeHabits,
      timeSpent,
      mood: category === 'wellness' ? 4 : 0,
      energy: category === 'wellness' ? 4 : 0,
      stress: category === 'wellness' ? 2 : 0,
      weeklyProgress,
      monthlyProgress
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

  // Add new metrics calculations
  const calculateWellnessProgress = () => {
    const today = new Date();
    const weekStart = startOfWeek(today);
    
    const weeklyActivities = habits
      .filter(h => h.category === 'wellness')
      .filter(h => h.completedDates.some(date => 
        isWithinInterval(new Date(date), { start: weekStart, end: today })
      ));

    const monthlyActivities = habits
      .filter(h => h.category === 'wellness')
      .filter(h => h.completedDates.length > 0);

    return {
      weekly: (weeklyActivities.length / habits.filter(h => h.category === 'wellness').length) * 100,
      monthly: (monthlyActivities.length / habits.filter(h => h.category === 'wellness').length) * 100
    };
  };

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
            <Progress 
              value={wellnessMetrics.percentage} 
              className={`mt-2 ${
                wellnessMetrics.percentage >= 70 ? "bg-green-500" :
                wellnessMetrics.percentage >= 40 ? "bg-yellow-500" :
                "bg-red-500"
              }`}
            />
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

      {/* Wellness and Reflection Sections */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Wellness Section */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500" />
              Wellness Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Daily Metrics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Today's Mood</span>
                  <div className="flex items-center gap-2">
                    <Smile className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{wellnessMetrics.mood}/5</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Energy Level</span>
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-green-500" />
                    <span className="font-medium">{wellnessMetrics.energy}/5</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Stress Level</span>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{wellnessMetrics.stress}/5</span>
                  </div>
                </div>

                <Progress 
                  value={wellnessMetrics.percentage} 
                  className={`mt-2 ${
                    wellnessMetrics.percentage >= 70 ? "bg-green-500" :
                    wellnessMetrics.percentage >= 40 ? "bg-yellow-500" :
                    "bg-red-500"
                  }`}
                />
              </div>

              {/* Progress Tracking */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="text-sm font-medium">Progress Tracking</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weekly</span>
                      <Badge variant="secondary">
                        {Math.round(wellnessMetrics.weeklyProgress)}%
                      </Badge>
                    </div>
                    <Progress value={wellnessMetrics.weeklyProgress} className="h-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Monthly</span>
                      <Badge variant="secondary">
                        {Math.round(wellnessMetrics.monthlyProgress)}%
                      </Badge>
                    </div>
                    <Progress value={wellnessMetrics.monthlyProgress} className="h-1" />
                  </div>
                </div>
              </div>

              {/* Active Wellness Habits */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="text-sm font-medium">Active Wellness Habits</h4>
                <div className="space-y-3">
                  {habits
                    .filter(h => h.category === 'wellness' && h.streak > 0)
                    .slice(0, 3)
                    .map(habit => (
                      <div key={habit.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{habit.title}</span>
                        </div>
                        <Badge variant="outline">{habit.streak} days</Badge>
                      </div>
                    ))}
                  {habits.filter(h => h.category === 'wellness' && h.streak > 0).length === 0 && (
                    <p className="text-sm text-muted-foreground">No active wellness habits yet.</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reflection Section */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              Reflection Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Reflection Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <span className="text-2xl font-bold">{reflections.length}</span>
                  <p className="text-xs text-muted-foreground">Total Entries</p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-bold">{recentReflections.thisWeek}</span>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-bold">
                    {new Set(reflections.map(r => r.category)).size}
                  </span>
                  <p className="text-xs text-muted-foreground">Categories</p>
                </div>
              </div>

              {/* Recent Reflections */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Recent Reflections</h4>
                {reflections.slice(-3).map((reflection) => (
                  <div 
                    key={reflection.id} 
                    className="flex flex-col gap-1 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(reflection.date), 'MMM d')}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {reflection.category}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{reflection.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {reflection.content}
                    </p>
                  </div>
                ))}
                {reflections.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No reflections yet. Start journaling your thoughts!
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PersonalDevDashboard;