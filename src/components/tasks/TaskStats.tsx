'use client';

import * as React from 'react';
import { Task } from '@/types';
import { Progress, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const stats = React.useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const urgent = tasks.filter(t => t.tag === 'urgent').length;
    const progress = total ? Math.round((completed / total) * 100) : 0;
    const dueToday = tasks.filter(t => {
      const today = new Date().toISOString().split('T')[0];
      return t.dueDate === today && !t.completed;
    }).length;

    return { total, completed, urgent, progress, dueToday };
  }, [tasks]);

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <Progress value={stats.progress} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {stats.completed} completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Due Today</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.dueToday}</div>
          <p className="text-xs text-muted-foreground mt-2">
            Tasks need attention
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Urgent Tasks</CardTitle>
          <AlertCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.urgent}</div>
          <p className="text-xs text-muted-foreground mt-2">
            High priority items
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 