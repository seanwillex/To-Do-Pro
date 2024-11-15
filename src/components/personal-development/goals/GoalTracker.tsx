import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Goal } from "@/types";
import { Target } from "lucide-react";

interface GoalTrackerProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  updateGoal: (id: number, updates: Partial<Goal>) => void;
}

export function GoalTracker({ goals, setGoals, updateGoal }: GoalTrackerProps) {
  const activeGoals = goals.filter(goal => goal.status === 'in-progress');
  
  return (
    <div className="space-y-4">
      {activeGoals.map(goal => (
        <Card key={goal.id}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Target className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <h4 className="text-sm font-medium">{goal.title}</h4>
                <Progress value={goal.progress} className="mt-2" />
              </div>
              <span className="text-sm text-muted-foreground">
                {goal.progress}%
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 