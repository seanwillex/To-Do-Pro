import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task, Habit, Reflection } from "@/types";
import { format } from "date-fns";
import { CheckCircle2, BookOpen, Flame } from "lucide-react";

interface RecentActivitiesProps {
  tasks: Task[];
  habits: Habit[];
  reflections: Reflection[];
}

export function RecentActivities({ tasks, habits, reflections }: RecentActivitiesProps) {
  const recentTasks = tasks.slice(0, 3);
  const recentHabits = habits.slice(0, 3);
  const recentReflections = reflections.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTasks.map(task => (
            <div key={task.id} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{task.title}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {format(new Date(task.dueDate), 'MMM d')}
              </span>
            </div>
          ))}
          {recentHabits.map(habit => (
            <div key={habit.id} className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm">{habit.title}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                Streak: {habit.streak} days
              </span>
            </div>
          ))}
          {recentReflections.map(reflection => (
            <div key={reflection.id} className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-500" />
              <span className="text-sm">{reflection.title}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {format(new Date(reflection.date), 'MMM d')}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 