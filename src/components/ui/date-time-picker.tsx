"use client"

import * as React from "react"
import { Calendar as CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface DateTimePickerProps {
  date: Date
  setDate: (date: Date) => void
  className?: string
}

export function DateTimePicker({ date, setDate, className }: DateTimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)

  const [selectedDate, setSelectedDate] = React.useState<Date>(date)
  const [hour, setHour] = React.useState(format(date, "HH"))
  const [minute, setMinute] = React.useState(format(date, "mm"))

  // Update the date when the time changes
  const updateDate = () => {
    const newDate = new Date(selectedDate)
    newDate.setHours(parseInt(hour))
    newDate.setMinutes(parseInt(minute))
    setDate(newDate)
  }

  // Handle hour input
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (value >= 0 && value < 24) {
      setHour(e.target.value.padStart(2, "0"))
      if (e.target.value.length === 2) {
        minuteRef.current?.focus()
      }
    }
  }

  // Handle minute input
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (value >= 0 && value < 60) {
      setMinute(e.target.value.padStart(2, "0"))
    }
  }

  // Update the main date when any component changes
  React.useEffect(() => {
    updateDate()
  }, [selectedDate, hour, minute])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(date, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
          />
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center gap-1">
          <Input
            ref={hourRef}
            value={hour}
            onChange={handleHourChange}
            className="w-14"
            maxLength={2}
          />
          <span className="text-muted-foreground">:</span>
          <Input
            ref={minuteRef}
            value={minute}
            onChange={handleMinuteChange}
            className="w-14"
            maxLength={2}
          />
        </div>
      </div>
    </div>
  )
} 