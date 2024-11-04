'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  FileText, 
  Book, 
  Clock, 
  Target, 
  Flag, 
  GitMerge,
  Network 
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  activeTab?: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ sidebarOpen, activeTab = 'tasks', onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'tasks', icon: CheckCircle2, label: 'Tasks' },
    { id: 'notes', icon: FileText, label: 'Notes' },
    { id: 'docs', icon: Book, label: 'Docs' },
    { id: 'time', icon: Clock, label: 'Time Tracking' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'milestones', icon: Flag, label: 'Milestones' },
    { id: 'mindmaps', icon: Network, label: 'Mind Maps' },
  ];

  return (
    <div className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-background border-r transition-transform duration-200 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } overflow-y-auto`}>
      <div className="p-4 space-y-2">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <Button 
            key={id}
            className="w-full justify-start" 
            variant={activeTab === id ? 'secondary' : 'ghost'}
            onClick={() => onTabChange(id)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
} 