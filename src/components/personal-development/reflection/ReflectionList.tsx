'use client';

import React from 'react';
import { Reflection, ReflectionCategory, ReflectionMood } from '@/types';
import { 
  Card, 
  CardContent,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { ReflectionEditor } from './ReflectionEditor';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';

interface ReflectionListProps {
  reflections: Reflection[];
  onUpdate: (reflections: Reflection[]) => void;
}

const MOOD_OPTIONS = [
  { value: 'positive', label: 'Positive 😊' },
  { value: 'neutral', label: 'Neutral 😐' },
  { value: 'negative', label: 'Negative 😔' }
] as const;

const CATEGORIES: ReflectionCategory[] = [
  'learning',
  'wellness',
  'skill-building',
  'habits',
  'reading',
  'other'
];

export function ReflectionList({ reflections, onUpdate }: ReflectionListProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<ReflectionCategory | 'all'>('all');
  const [newReflection, setNewReflection] = React.useState<Omit<Reflection, 'id'>>({
    title: '',
    content: '',
    mood: 'neutral',
    learnings: [],
    nextSteps: [],
    category: 'learning',
    date: new Date().toISOString(),
    tags: []
  });

  const filteredReflections = React.useMemo(() => {
    if (filter === 'all') {
      return reflections;
    }
    return reflections.filter(reflection => reflection.category === filter);
  }, [reflections, filter]);

  const sortedReflections = React.useMemo(() => {
    return [...filteredReflections].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [filteredReflections]);

  const handleSubmit = () => {
    if (newReflection.title && newReflection.content) {
      const reflection: Reflection = {
        id: Date.now(),
        title: newReflection.title,
        content: newReflection.content,
        date: newReflection.date,
        category: newReflection.category,
        mood: newReflection.mood,
        learnings: newReflection.learnings,
        nextSteps: newReflection.nextSteps,
        tags: newReflection.tags
      };

      onUpdate([...reflections, reflection]);
      setIsDialogOpen(false);
      setNewReflection({
        title: '',
        content: '',
        mood: 'neutral',
        learnings: [],
        nextSteps: [],
        category: 'learning',
        date: new Date().toISOString(),
        tags: []
      });
    }
  };

  const addNewLearning = () => {
    setNewReflection(prev => ({
      ...prev,
      learnings: [...(prev.learnings || []), '']
    }));
  };

  const updateLearning = (index: number, value: string) => {
    setNewReflection(prev => {
      const learnings = [...(prev.learnings || [])];
      learnings[index] = value;
      return { ...prev, learnings };
    });
  };

  const addNewNextStep = () => {
    setNewReflection(prev => ({
      ...prev,
      nextSteps: [...(prev.nextSteps || []), '']
    }));
  };

  const updateNextStep = (index: number, value: string) => {
    setNewReflection(prev => {
      const nextSteps = [...(prev.nextSteps || [])];
      nextSteps[index] = value;
      return { ...prev, nextSteps };
    });
  };

  const handleReflectionUpdate = (updatedReflection: Partial<Reflection>) => {
    const updatedReflections = reflections.map(r => 
      r.id === updatedReflection.id ? { ...r, ...updatedReflection } : r
    );
    onUpdate(updatedReflections);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Reflection
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Reflection</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={newReflection.title}
                  onChange={(e) => setNewReflection(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your reflection a title..."
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
                    {CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Mood</Label>
                <Select
                  value={newReflection.mood}
                  onValueChange={(value: ReflectionMood) =>
                    setNewReflection(prev => ({ ...prev, mood: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How are you feeling?" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOOD_OPTIONS.map(mood => (
                      <SelectItem key={mood.value} value={mood.value}>
                        {mood.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Reflection</Label>
                <Textarea
                  value={newReflection.content}
                  onChange={(e) => setNewReflection(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Key Learnings</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addNewLearning}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {newReflection.learnings?.map((learning, index) => (
                  <Input
                    key={index}
                    value={learning}
                    onChange={(e) => updateLearning(index, e.target.value)}
                    placeholder="What did you learn?"
                  />
                ))}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Next Steps</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addNewNextStep}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {newReflection.nextSteps?.map((step, index) => (
                  <Input
                    key={index}
                    value={step}
                    onChange={(e) => updateNextStep(index, e.target.value)}
                    placeholder="What's your next action?"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSubmit}>Save Reflection</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Select
          value={filter}
          onValueChange={(value: ReflectionCategory | 'all') => setFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map(category => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {sortedReflections.map(reflection => (
          <ReflectionEditor
            key={reflection.id}
            reflection={reflection}
            onUpdate={handleReflectionUpdate}
          />
        ))}
        {sortedReflections.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No reflections found. Start your reflection journey today!
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default ReflectionList;