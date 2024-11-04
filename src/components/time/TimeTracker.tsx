'use client';

import * as React from 'react';
import { TimeEntry, Task } from '@/types';
import { Button } from '@/components/ui';
import { Play, Pause, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface TimeTrackerProps {
  task: Task;
  onTimeEntry: (entry: TimeEntry) => void;
}

export function TimeTracker({ task, onTimeEntry }: TimeTrackerProps) {
  const [isTracking, setIsTracking] = React.useState(false);
  const [startTime, setStartTime] = React.useState<Date | null>(null);
  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  const toggleTracking = () => {
    if (!isTracking) {
      setStartTime(new Date());
      setIsTracking(true);
    } else {
      setIsTracking(false);
      if (startTime) {
        const endTime = new Date();
        const duration = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));
        onTimeEntry({
          id: Date.now(),
          taskId: task.id,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration,
        });
      }
      setStartTime(null);
      setElapsed(0);
    }
  };

  const formatElapsed = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTracking}
      >
        {isTracking ? (
          <Pause className="h-4 w-4 mr-2" />
        ) : (
          <Play className="h-4 w-4 mr-2" />
        )}
        {isTracking ? 'Stop' : 'Start'} Timer
      </Button>
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4" />
        {formatElapsed(elapsed)}
      </div>
    </div>
  );
} 