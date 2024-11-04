'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
}

export function Sidebar({ sidebarOpen }: SidebarProps) {
  return (
    <div className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-white border-r transition-transform duration-200 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="p-4 space-y-4">
        <Button className="w-full justify-start" variant="ghost">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Tasks
        </Button>
        <Button className="w-full justify-start" variant="ghost">
          <FileText className="mr-2 h-4 w-4" />
          Notes
        </Button>
      </div>
    </div>
  );
} 