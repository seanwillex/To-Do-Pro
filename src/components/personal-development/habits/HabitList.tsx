'use client';

import React from 'react';
import { Habit, TaskCategory } from '@/types';
import { 
  Card, 
  CardContent,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@/components/ui";
import { HabitCard } from './HabitCard';
import { Plus } from 'lucide-react';

interface HabitListProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  updateHabit: (id: number, updates: Partial<Habit>) => void;
}

type HabitFrequency = 'daily' | 'weekly' | 'monthly' | 'custom';
type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'anytime';

const HABIT_FREQUENCIES: Array<{ value: HabitFrequency; label: string }> = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom' },
];

const TIME_OF_DAY_OPTIONS: Array<{ value: TimeOfDay; label: string }> = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
  { value: 'anytime', label: 'Anytime' },
];

const CATEGORIES: TaskCategory[] = [
  'learning',
  'wellness',
  'skill-building',
  'habits',
  'reading',
  'other'
];

export function HabitList({ habits, setHabits, updateHabit }: HabitListProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [filterCategory, setFilterCategory] = React.useState<TaskCategory | 'all'>('all');
  const [newHabit, setNewHabit] = React.useState<Partial<Habit>>({
    title: '',
    description: '',
    frequency: 'daily',
    timeOfDay: 'anytime',
    category: 'habits',
    streak: 0,
    completedDates: [],
    reminder: {
      enabled: false
    }
  });

  const addHabit = () => {
    if (newHabit.title) {
      const habit: Habit = {
        id: Date.now(),
        title: newHabit.title,
        description: newHabit.description || '',
        frequency: newHabit.frequency || 'daily',
        timeOfDay: newHabit.timeOfDay || 'anytime',
        category: newHabit.category || 'habits',
        streak: 0,
        completedDates: [],
        created: new Date().toISOString(),
        reminder: {
          enabled: newHabit.reminder?.enabled || false,
          time: newHabit.reminder?.time
        }
      };
      setHabits(prev => [...prev, habit]);
      setIsDialogOpen(false);
      setNewHabit({
        title: '',
        description: '',
        frequency: 'daily',
        timeOfDay: 'anytime',
        category: 'habits',
        streak: 0,
        completedDates: [],
        reminder: {
          enabled: false
        }
      });
    }
  };

  const handleHabitComplete = (habitId: number) => {
    const today = new Date().toISOString().split('T')[0];
    const habit = habits.find(h => h.id === habitId);
    
    if (habit) {
      const completedDates = new Set(habit.completedDates);
      if (completedDates.has(today)) {
        completedDates.delete(today);
      } else {
        completedDates.add(today);
      }
      
      updateHabit(habitId, {
        completedDates: Array.from(completedDates)
      });
    }
  };

  const filteredHabits = React.useMemo(() => {
    return filterCategory === 'all'
      ? habits
      : habits.filter(habit => habit.category === filterCategory);
  }, [habits, filterCategory]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Habit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Habit</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={newHabit.title}
                  onChange={(e) => setNewHabit(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter habit title..."
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Description</Label>
                <Input
                  value={newHabit.description}
                  onChange={(e) => setNewHabit(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter description..."
                />
              </div>

              <div className="grid gap-2">
                <Label>Frequency</Label>
                <Select
                  value={newHabit.frequency}
                  onValueChange={(value: HabitFrequency) => 
                    setNewHabit(prev => ({ ...prev, frequency: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {HABIT_FREQUENCIES.map(freq => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Time of Day</Label>
                <Select
                  value={newHabit.timeOfDay}
                  onValueChange={(value: TimeOfDay) => 
                    setNewHabit(prev => ({ ...prev, timeOfDay: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time of day" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OF_DAY_OPTIONS.map(time => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={newHabit.category}
                  onValueChange={(value: TaskCategory) => 
                    setNewHabit(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={addHabit}>Create Habit</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Select
          value={filterCategory}
          onValueChange={(value: TaskCategory | 'all') => setFilterCategory(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map(category => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredHabits.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onComplete={() => handleHabitComplete(habit.id)}
            onUpdate={(updates) => updateHabit(habit.id, updates)}
          />
        ))}
        {filteredHabits.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No habits found. Create your first habit to get started!
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default HabitList;