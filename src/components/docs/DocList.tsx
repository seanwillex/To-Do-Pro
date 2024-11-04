'use client';

import * as React from 'react';
import { Doc } from '@/types';
import { AddItemForm } from '@/components/shared/AddItemForm';
import { DocCard } from './DocCard';

interface DocListProps {
  docs: Doc[];
  setDocs: React.Dispatch<React.SetStateAction<Doc[]>>;
  updateDocContent: (id: number, content: string) => void;
}

export function DocList({ docs, setDocs, updateDocContent }: DocListProps) {
  const addDoc = (title: string) => {
    const newDoc: Doc = {
      id: Date.now(),
      title,
      content: '',
      category: 'general',
      lastUpdated: new Date().toISOString()
    };
    setDocs(prev => [...prev, newDoc]);
  };

  return (
    <div>
      <div className="mb-4">
        <AddItemForm onAdd={addDoc} placeholder="Add a new document..." />
      </div>
      <div className="grid gap-4">
        {docs.map(doc => (
          <DocCard
            key={doc.id}
            doc={doc}
            updateContent={updateDocContent}
          />
        ))}
      </div>
    </div>
  );
} 