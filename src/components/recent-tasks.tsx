"use client"

import * as React from "react"
import { CheckCircle2, CircleDot } from "lucide-react"

interface Task {
  id: string
  title: string
  date: string
  completed: boolean
}

export function RecentTasks() {
  const [tasks, setTasks] = React.useState<Task[] | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setTasks(recentTasks)
  }, [])

  if (!mounted || !tasks) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{task.title}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(task.date).toLocaleDateString()}
            </p>
          </div>
          <div className="ml-auto">
            {task.completed ? (
              <CheckCircle2 className="h-4 w-4 text-primary" />
            ) : (
              <CircleDot className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const recentTasks = [
  {
    id: "1",
    title: "Complete project proposal",
    date: "2024-02-10",
    completed: true,
  },
  {
    id: "2",
    title: "Review team updates",
    date: "2024-02-09",
    completed: true,
  },
  {
    id: "3",
    title: "Update documentation",
    date: "2024-02-08",
    completed: false,
  },
  {
    id: "4",
    title: "Team meeting preparation",
    date: "2024-02-07",
    completed: false,
  },
  {
    id: "5",
    title: "Client presentation",
    date: "2024-02-06",
    completed: true,
  },
] 