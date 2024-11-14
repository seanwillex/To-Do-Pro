'use client';

import React from 'react';
import { Resource, TaskCategory, TaskPriority } from '@/types';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Progress,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { BookOpen, Link2, Calendar, Clock, Star, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface ResourceLibraryProps {
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  updateResource: (id: number, updates: Partial<Resource>) => void;
}

const RESOURCE_TYPES = [
  'book',
  'course',
  'video',
  'article',
  'other'
] as const;

const CATEGORIES: TaskCategory[] = [
  'learning',
  'skill-building',
  'reading',
  'other'
];

const PRIORITIES: Array<TaskPriority> = ['low', 'medium', 'high'];

const STATUS_OPTIONS = [
  'not-started',
  'in-progress',
  'completed',
  'on-hold'
] as const;

export function ResourceLibrary({
  resources,
  setResources,
  updateResource
}: ResourceLibraryProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<'all' | TaskCategory>('all');
  const [typeFilter, setTypeFilter] = React.useState<'all' | Resource['type']>('all');
  const [newResource, setNewResource] = React.useState<Partial<Resource>>({
    title: '',
    type: 'book',
    category: 'learning',
    progress: 0,
    priority: 'medium',
    status: 'not-started'
  });

  const addResource = () => {
    if (newResource.title) {
      const resource: Resource = {
        id: Date.now(),
        title: newResource.title,
        type: newResource.type || 'book',
        category: newResource.category || 'learning',
        url: newResource.url,
        notes: newResource.notes,
        startDate: new Date().toISOString(),
        progress: 0,
        priority: newResource.priority || 'medium',
        status: 'not-started',
        rating: 0,
        timeSpent: 0,
        tags: []
      };

      setResources(prev => [...prev, resource]);
      setIsDialogOpen(false);
      setNewResource({
        title: '',
        type: 'book',
        category: 'learning',
        progress: 0,
        priority: 'medium',
        status: 'not-started'
      });
    }
  };

  const filteredResources = React.useMemo(() => {
    return resources.filter(resource => {
      const categoryMatch = filter === 'all' || resource.category === filter;
      const typeMatch = typeFilter === 'all' || resource.type === typeFilter;
      return categoryMatch && typeMatch;
    });
  }, [resources, filter, typeFilter]);

  // Sort resources by progress and priority
  const sortedResources = React.useMemo(() => {
    return [...filteredResources].sort((a, b) => {
      // First sort by status
      const statusOrder = { 'in-progress': 0, 'not-started': 1, 'completed': 2, 'on-hold': 3 };
      const statusDiff = (statusOrder[a.status || 'not-started'] || 0) - (statusOrder[b.status || 'not-started'] || 0);
      if (statusDiff !== 0) return statusDiff;

      // Then by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = (priorityOrder[a.priority || 'medium'] || 1) - (priorityOrder[b.priority || 'medium'] || 1);
      if (priorityDiff !== 0) return priorityDiff;

      // Finally by progress
      return b.progress - a.progress;
    });
  }, [filteredResources]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Learning Resource</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={newResource.title}
                  onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Resource title..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Type</Label>
                  <Select
                    value={newResource.type}
                    onValueChange={(value: Resource['type']) =>
                      setNewResource(prev => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {RESOURCE_TYPES.map(type => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select
                    value={newResource.category}
                    onValueChange={(value: TaskCategory) =>
                      setNewResource(prev => ({ ...prev, category: value }))
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
              </div>

              <div className="grid gap-2">
                <Label>URL (optional)</Label>
                <Input
                  value={newResource.url}
                  onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="grid gap-2">
                <Label>Priority</Label>
                <Select
                  value={newResource.priority}
                  onValueChange={(value: TaskPriority) =>
                    setNewResource(prev => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map(priority => (
                      <SelectItem key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Notes (optional)</Label>
                <Textarea
                  value={newResource.notes}
                  onChange={(e) => setNewResource(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any notes or description..."
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={addResource}>Add Resource</Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex gap-2">
          <Select
            value={filter}
            onValueChange={(value: 'all' | TaskCategory) => setFilter(value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
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

          <Select
            value={typeFilter}
            onValueChange={(value: 'all' | Resource['type']) => setTypeFilter(value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {RESOURCE_TYPES.map(type => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedResources.map(resource => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onUpdate={updateResource}
          />
        ))}
        {sortedResources.length === 0 && (
          <Card className="sm:col-span-2 lg:col-span-3">
            <CardContent className="py-8 text-center text-muted-foreground">
              No resources found. Start building your learning library!
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

interface ResourceCardProps {
  resource: Resource;
  onUpdate: (id: number, updates: Partial<Resource>) => void;
}

function ResourceCard({ resource, onUpdate }: ResourceCardProps) {
  const statusColors = {
    'not-started': 'bg-gray-500',
    'in-progress': 'bg-blue-500',
    'completed': 'bg-green-500',
    'on-hold': 'bg-yellow-500'
  };

  const priorityColors = {
    low: 'text-blue-500',
    medium: 'text-yellow-500',
    high: 'text-red-500'
  };

  const handleProgressUpdate = (newProgress: number) => {
    onUpdate(resource.id, { progress: newProgress });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">{resource.title}</h3>
          </div>
          {resource.url && (
            <a 
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
            >
              <Link2 className="h-3 w-3" />
              View Resource
            </a>
          )}
        </div>
        <Badge className={statusColors[resource.status || 'not-started']}>
          {resource.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span>{resource.progress}%</span>
          </div>
          <Progress 
            value={resource.progress} 
            className="cursor-pointer"
            onClick={() => handleProgressUpdate(Math.min(resource.progress + 10, 100))}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {resource.startDate ? format(new Date(resource.startDate), 'MMM d, yyyy') : 'Not started'}
            </span>
          </div>
          {resource.timeSpent && resource.timeSpent > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {Math.round(resource.timeSpent / 60)}h
              </span>
            </div>
          )}
        </div>

        {resource.notes && (
          <p className="text-sm text-muted-foreground">{resource.notes}</p>
        )}

        {resource.rating && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < resource.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                }`}
                onClick={() => onUpdate(resource.id, { rating: i + 1 })}
              />
            ))}
          </div>
        )}

        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {resource.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ResourceLibrary;