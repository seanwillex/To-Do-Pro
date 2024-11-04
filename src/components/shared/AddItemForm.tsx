'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddItemFormProps {
  onAdd: (title: string) => void;
  placeholder: string;
}

export function AddItemForm({ onAdd, placeholder }: AddItemFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder={placeholder}
        className="flex-grow"
      />
      <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  );
} 