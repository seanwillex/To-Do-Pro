import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Habit } from "@/types";

interface HabitProgressProps {
  habits: Habit[];
}

export function HabitProgress({ habits }: HabitProgressProps) {
  const today = new Date().toISOString().split('T')[0];
  const activeHabits = habits.filter(h => h.status === 'active');
  const completedToday = activeHabits.filter(h => 
    h.completedDates.includes(today)
  );
  const progress = activeHabits.length ? (completedToday.length / activeHabits.length) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{completedToday.length}/{activeHabits.length}</div>
        <Progress value={progress} className="mt-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {completedToday.length} habits completed today
        </p>
      </CardContent>
    </Card>
  );
} 