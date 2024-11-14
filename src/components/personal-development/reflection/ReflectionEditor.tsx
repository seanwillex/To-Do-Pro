'use client';

import React from 'react';
import { Reflection } from '@/types';
import {
  Card,
  CardHeader,
  CardContent,
  Badge,
  Button,
  Textarea,
} from "@/components/ui";
import { Calendar, Pencil, Check, X, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface ReflectionEditorProps {
  reflection: Reflection;
  onUpdate: (updates: Partial<Reflection>) => void;
}

const moodEmojis = {
  positive: '😊',
  neutral: '😐',
  negative: '😔'
} as const;

const categoryColors: Record<string, string> = {
  learning: 'bg-blue-500',
  wellness: 'bg-green-500',
  'skill-building': 'bg-purple-500',
  habits: 'bg-yellow-500',
  reading: 'bg-indigo-500',
  reflection: 'bg-pink-500',
  other: 'bg-gray-500'
};

export function ReflectionEditor({ reflection, onUpdate }: ReflectionEditorProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState(reflection.content);

  const handleSave = () => {
    onUpdate({ content: editedContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(reflection.content);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{reflection.title}</h3>
            <div className="text-2xl">{moodEmojis[reflection.mood]}</div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {format(new Date(reflection.date), 'PPP')}
            </span>
          </div>
        </div>
        {reflection.category && (
          <Badge className={categoryColors[reflection.category] || categoryColors.other}>
            {reflection.category}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[200px]"
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <div className="prose max-w-none">
              {reflection.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2">{paragraph}</p>
              ))}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}

        {reflection.learnings && reflection.learnings.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Key Learnings</h4>
            <ul className="list-disc pl-4 space-y-1">
              {reflection.learnings.map((learning, index) => (
                <li key={index} className="text-sm">{learning}</li>
              ))}
            </ul>
          </div>
        )}

        {reflection.nextSteps && reflection.nextSteps.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Next Steps</h4>
            <ul className="list-disc pl-4 space-y-1">
              {reflection.nextSteps.map((step, index) => (
                <li key={index} className="text-sm">{step}</li>
              ))}
            </ul>
          </div>
        )}

        {reflection.tags && reflection.tags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {reflection.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {(reflection.linkedGoalId || reflection.linkedHabitId) && (
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            {reflection.linkedGoalId && (
              <Badge variant="outline">
                Linked to Goal #{reflection.linkedGoalId}
              </Badge>
            )}
            {reflection.linkedHabitId && (
              <Badge variant="outline">
                Linked to Habit #{reflection.linkedHabitId}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ReflectionEditor;