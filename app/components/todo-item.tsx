import { Todo } from "../types/todo"

interface TodoItemProps {
  todo: Todo
}

// Add hover effects to todo items
export function TodoItem({ todo }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-card">
      {/* ... rest of the component code ... */}
    </div>
  )
} 