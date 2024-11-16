import { useState } from 'react';
import { Task, Goal, Habit, Reflection, TimeEntry } from '@/types';
import { INITIAL_TASKS, INITIAL_GOALS, INITIAL_HABITS, INITIAL_REFLECTIONS } from '@/lib/constants';

export function usePersonalDev() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [reflections, setReflections] = useState<Reflection[]>(INITIAL_REFLECTIONS);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const updateGoal = (id: number, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const updateHabit = (id: number, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const updateReflection = (id: number, updates: Partial<Reflection>) => {
    setReflections(prev => prev.map(reflection => 
      reflection.id === id ? { ...reflection, ...updates } : reflection
    ));
  };

  return {
    tasks,
    goals,
    habits,
    reflections,
    timeEntries,
    updateTask,
    updateGoal,
    updateHabit,
    updateReflection
  };
} 