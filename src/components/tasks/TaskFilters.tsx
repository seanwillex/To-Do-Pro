'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { Task } from '@/types';

interface TaskFiltersProps {
  onFilterChange: (tag: Task['tag'] | 'all') => void;
  onSortChange: (sort: 'dueDate' | 'title' | 'status') => void;
  onSortDirectionChange: () => void;
  sortDirection: 'asc' | 'desc';
}

export function TaskFilters({ 
  onFilterChange, 
  onSortChange, 
  onSortDirectionChange,
  sortDirection 
}: TaskFiltersProps) {
  return (
    <div className="flex gap-2 mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onFilterChange('all')}>
            All Tasks
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('urgent')}>
            Urgent
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('in-progress')}>
            In Progress
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('completed')}>
            Completed
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange('pending')}>
            Pending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {sortDirection === 'asc' ? (
              <SortAsc className="h-4 w-4 mr-2" />
            ) : (
              <SortDesc className="h-4 w-4 mr-2" />
            )}
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onSortChange('dueDate')}>
            Due Date
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange('title')}>
            Title
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange('status')}>
            Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSortDirectionChange}>
            Toggle Direction
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 