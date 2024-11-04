'use client';

import * as React from 'react';
import { Calendar, Popover, PopoverContent, PopoverTrigger, Button } from "@/components/ui";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskDueDateProps {
  date: Date;
  onDateChange: (date: Date | undefined) => void;
}

export function TaskDueDate({ date, onDateChange }: TaskDueDateProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
} 