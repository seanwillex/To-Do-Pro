'use client';

import * as React from 'react';
import { Task, Note, TimeEntry } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, Progress } from "@/components/ui";
import { Clock, CheckCircle2, FileText, AlertCircle, Calendar } from 'lucide-react';
import { format, isToday, isThisWeek } from 'date-fns';

interface DashboardProps {
  tasks: Task[];
  notes: Note[];
  timeEntries: TimeEntry[];
}

export function Dashboard({ tasks, notes, timeEntries }: DashboardProps) {
  const stats = React.useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const urgentTasks = tasks.filter(t => t.tag === 'urgent').length;
    const taskProgress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    const todaysTasks = tasks.filter(t => isToday(new Date(t.dueDate)));
    const thisWeekTasks = tasks.filter(t => isThisWeek(new Date(t.dueDate)));
    
    const totalTimeTracked = timeEntries.reduce((acc, entry) => {
      if (entry.endTime) {
        const duration = new Date(entry.endTime).getTime() - new Date(entry.startTime).getTime();
        return acc + duration;
      }
      return acc;
    }, 0);

    const hoursTracked = Math.floor(totalTimeTracked / (1000 * 60 * 60));
    
    return {
      totalTasks,
      completedTasks,
      urgentTasks,
      taskProgress,
      todaysTasks,
      thisWeekTasks,
      hoursTracked,
      totalNotes: notes.length
    };
  }, [tasks, notes, timeEntries]);

  const recentActivity = [...tasks, ...notes]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.taskProgress}%</div>
            <Progress value={stats.taskProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {stats.completedTasks} of {stats.totalTasks} tasks completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Tracked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hoursTracked}h</div>
            <p className="text-xs text-muted-foreground mt-2">
              Total hours tracked this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todaysTasks.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.thisWeekTasks.length} tasks due this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.urgentTasks}</div>
            <p className="text-xs text-muted-foreground mt-2">
              High priority items
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tasks.slice(0, 5).map(task => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${task.completed ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(task.dueDate), 'MMM d')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notes.slice(0, 5).map(note => (
                <div
                  key={note.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{note.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {note.tag}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 