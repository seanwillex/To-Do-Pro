'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PersonalDevDashboard } from '@/components/personal-development/dashboard/PersonalDevDashboard';
import { ReflectionList } from '@/components/personal-development/reflection/ReflectionList';
import { Task, Goal, Habit, Reflection, TimeEntry } from '@/types';
import { INITIAL_TASKS, INITIAL_GOALS, INITIAL_HABITS, INITIAL_REFLECTIONS } from '@/lib/constants';

const tabs = [
  { id: 'goals', label: 'Goals' },
  { id: 'habits', label: 'Habits' },
  { id: 'learning', label: 'Learning' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'reflection', label: 'Reflection' }
];

export default function PersonalDevelopmentPage() {
  const [activeTab, setActiveTab] = useState('goals');
  const [tasks] = useState<Task[]>(INITIAL_TASKS);
  const [goals] = useState<Goal[]>(INITIAL_GOALS);
  const [habits] = useState<Habit[]>(INITIAL_HABITS);
  const [reflections, setReflections] = useState<Reflection[]>(INITIAL_REFLECTIONS);
  const [timeEntries] = useState<TimeEntry[]>([]);

  const commonProps = {
    tasks,
    goals,
    habits,
    reflections,
    timeEntries
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Personal Development</h1>
      
      {/* Navigation */}
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'goals' && <PersonalDevDashboard {...commonProps} />}
        {activeTab === 'habits' && <PersonalDevDashboard {...commonProps} />}
        {activeTab === 'learning' && <PersonalDevDashboard {...commonProps} />}
        {activeTab === 'wellness' && <PersonalDevDashboard {...commonProps} />}
        {activeTab === 'reflection' && (
          <ReflectionList 
            reflections={reflections}
            onUpdate={(updatedReflections: Reflection[]) => {
              setReflections(updatedReflections);
            }}
          />
        )}
      </div>
    </div>
  );
} 