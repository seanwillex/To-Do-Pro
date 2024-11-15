'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Plus, BookOpen, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { Reflection, ReflectionCategory, ReflectionMood } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ReflectionTrackerProps {
  reflections: Reflection[];
  onAddReflection: (reflection: Reflection) => void;
}

export function ReflectionTracker({ reflections, onAddReflection }: ReflectionTrackerProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newReflection, setNewReflection] = React.useState<Partial<Reflection>>({
    title: '',
    content: '',
    category: 'learning',
    date: new Date().toISOString(),
    mood: 'neutral',
    tags: []
  });

  const handleSubmit = () => {
    if (newReflection.title && newReflection.content) {
      onAddReflection({
        ...newReflection,
        id: Date.now(),
        date: new Date().toISOString(),
      } as Reflection);
      setIsDialogOpen(false);
      setNewReflection({
        title: '',
        content: '',
        category: 'learning',
        date: new Date().toISOString(),
        mood: 'neutral',
        tags: []
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reflections & Insights</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Reflection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Reflection</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newReflection.title}
                  onChange={(e) => setNewReflection(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What's on your mind?"
                />
              </div>

              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={newReflection.category}
                  onValueChange={(value: ReflectionCategory) => 
                    setNewReflection(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="learning">Learning</SelectItem>
                    <SelectItem value="wellness">Wellness</SelectItem>
                    <SelectItem value="goals">Goals</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="reflection">Reflection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Content</Label>
                <Textarea
                  value={newReflection.content}
                  onChange={(e) => setNewReflection(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts, insights, or learnings..."
                  className="min-h-[150px]"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSubmit}>Save Reflection</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reflections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reflections.slice(-5).reverse().map(reflection => (
                <div key={reflection.id} className="flex flex-col gap-2 p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{reflection.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(reflection.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {reflection.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{reflection.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reflection Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Reflections</span>
                <span className="font-bold">{reflections.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-bold">
                  {reflections.filter(r => 
                    new Date(r.date).getMonth() === new Date().getMonth()
                  ).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Categories</span>
                <span className="font-bold">
                  {new Set(reflections.map(r => r.category)).size}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 