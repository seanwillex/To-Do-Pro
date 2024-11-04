'use client';

import * as React from 'react';
import { Task, TimeEntry } from '@/types';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui";
import { TimeTracker } from '@/components/time/TimeTracker';
import { format, differenceInMinutes } from 'date-fns';

interface TimeTrackingViewProps {
  tasks: Task[];
  timeEntries: TimeEntry[];
  onTimeEntry: (entry: TimeEntry) => void;
}

export function TimeTrackingView({ tasks, timeEntries, onTimeEntry }: TimeTrackingViewProps) {
  const taskTimeStats = React.useMemo(() => {
    return tasks.map(task => {
      const taskEntries = timeEntries.filter(entry => entry.taskId === task.id);
      const totalMinutes = taskEntries.reduce((acc, entry) => {
        if (entry.endTime) {
          return acc + differenceInMinutes(new Date(entry.endTime), new Date(entry.startTime));
        }
        return acc;
      }, 0);
      
      return {
        task,
        totalTime: totalMinutes,
        entries: taskEntries,
      };
    });
  }, [tasks, timeEntries]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-4">
      {taskTimeStats.map(({ task, totalTime, entries }) => (
        <Card key={task.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <span className="text-sm text-muted-foreground">
                Total: {formatDuration(totalTime)}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TimeTracker task={task} onTimeEntry={onTimeEntry} />
              
              {entries.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Recent Time Entries</h4>
                  <div className="space-y-2">
                    {entries.slice(-3).map(entry => (
                      <div
                        key={entry.id}
                        className="text-sm text-muted-foreground flex justify-between items-center"
                      >
                        <span>
                          {format(new Date(entry.startTime), 'MMM d, h:mm a')}
                          {' → '}
                          {entry.endTime && format(new Date(entry.endTime), 'h:mm a')}
                        </span>
                        <span>
                          {entry.endTime && formatDuration(
                            differenceInMinutes(
                              new Date(entry.endTime),
                              new Date(entry.startTime)
                            )
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 