'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  CheckCircle2, 
  FileText, 
  Target, 
  Bell,
  Brain,
  Flame,
  BookOpen,
  HeartPulse,
  Lightbulb
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  activeTab?: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ sidebarOpen, activeTab = 'dashboard', onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'tasks', icon: CheckCircle2, label: 'Tasks' },
    { id: 'notes', icon: FileText, label: 'Notes' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'habits', icon: Flame, label: 'Habits' },
    { id: 'personal-dev', icon: Brain, label: 'Personal Development' },
    { id: 'wellness', icon: HeartPulse, label: 'Wellness' },
    { id: 'resources', icon: BookOpen, label: 'Resources' },
    { id: 'reflections', icon: Lightbulb, label: 'Reflections' },
    { id: 'reminders', icon: Bell, label: 'Reminders' },
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