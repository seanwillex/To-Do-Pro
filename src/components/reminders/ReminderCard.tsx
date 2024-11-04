'use client';

import * as React from 'react';
import { Reminder, Task } from '@/types';
import { 
  Card, 
  CardHeader, 
  CardContent,
  Badge,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { Bell, Calendar, Clock, Link as LinkIcon, Check, X } from 'lucide-react';
import { format } from 'date-fns';

interface ReminderCardProps {
  reminder: Reminder;
  tasks: Task[];
  updateReminder: (id: number, updates: Partial<Reminder>) => void;
}

export function ReminderCard({ reminder, tasks, updateReminder }: ReminderCardProps) {
  const linkedTask = tasks.find(task => task.id === reminder.taskId);
  const priorityColors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };

  const handleStatusChange = (status: Reminder['status']) => {
    if (status !== 'all') {
      updateReminder(reminder.id, { status });
    }
  };

  const handleTaskLink = (taskId: number) => {
    updateReminder(reminder.id, { taskId });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateReminder(reminder.id, { description: e.target.value });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{reminder.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(`${reminder.dueDate}T${reminder.dueTime}`), 'PPp')}</span>
            {reminder.repeat !== 'none' && (
              <Badge variant="outline">Repeats {reminder.repeat}</Badge>
            )}
          </div>
        </div>
        <Badge className={priorityColors[reminder.priority]}>
          {reminder.priority}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            value={reminder.description}
            onChange={handleDescriptionChange}
            placeholder="Add a description..."
            className="min-h-[100px] resize-none"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select value={reminder.taskId.toString()} onValueChange={(value: string) => handleTaskLink(Number(value))}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Link to task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No linked task</SelectItem>
                  {tasks.map(task => (
                    <SelectItem key={task.id} value={task.id.toString()}>
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {linkedTask && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <LinkIcon className="h-3 w-3" />
                  {linkedTask.title}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange('completed')}
                disabled={reminder.status === 'completed'}
              >
                <Check className="h-4 w-4 mr-1" />
                Complete
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange('dismissed')}
                disabled={reminder.status === 'dismissed'}
              >
                <X className="h-4 w-4 mr-1" />
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 