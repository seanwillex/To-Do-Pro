'use client';

import * as React from 'react';
import { Reminder, Task } from '@/types';
import { ReminderCard } from './ReminderCard';
import { 
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
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
} from "@/components/ui";
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReminderListProps {
  reminders: Reminder[];
  tasks: Task[];
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
  updateReminder: (id: number, updates: Partial<Reminder>) => void;
}

type NewReminderState = {
  title: string;
  description: string;
  date: Date;
  time: string;
  priority: 'low' | 'medium' | 'high';
  repeat: 'none' | 'daily' | 'weekly' | 'monthly';
}

export function ReminderList({ reminders, tasks, setReminders, updateReminder }: ReminderListProps) {
  const [filter, setFilter] = React.useState<Reminder['status'] | 'all'>('pending');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newReminder, setNewReminder] = React.useState<NewReminderState>({
    title: '',
    description: '',
    date: new Date(),
    time: format(new Date(), 'HH:mm'),
    priority: 'medium',
    repeat: 'none'
  });

  const addReminder = () => {
    const reminder: Reminder = {
      id: Date.now(),
      taskId: 0,
      title: newReminder.title,
      description: newReminder.description,
      dueDate: format(newReminder.date, 'yyyy-MM-dd'),
      dueTime: newReminder.time,
      status: 'pending',
      priority: newReminder.priority,
      repeat: newReminder.repeat
    };
    setReminders(prev => [...prev, reminder]);
    setIsDialogOpen(false);
    setNewReminder({
      title: '',
      description: '',
      date: new Date(),
      time: format(new Date(), 'HH:mm'),
      priority: 'medium',
      repeat: 'none'
    });
  };

  const filteredReminders = reminders.filter(reminder => 
    filter === 'all' ? true : reminder.status === filter
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Reminder</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Reminder</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newReminder.description}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newReminder.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(newReminder.date, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newReminder.date}
                      onSelect={(date) => date && setNewReminder(prev => ({ ...prev, date }))}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label>Time</Label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Priority</Label>
                <Select
                  value={newReminder.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') => 
                    setNewReminder(prev => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Repeat</Label>
                <Select
                  value={newReminder.repeat}
                  onValueChange={(value: 'none' | 'daily' | 'weekly' | 'monthly') => 
                    setNewReminder(prev => ({ ...prev, repeat: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={addReminder}>Add Reminder</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Select value={filter} onValueChange={(value: Reminder['status'] | 'all') => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="dismissed">Dismissed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredReminders.map(reminder => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            tasks={tasks}
            updateReminder={updateReminder}
          />
        ))}
      </div>
    </div>
  );
} 