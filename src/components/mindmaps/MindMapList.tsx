'use client';

import * as React from 'react';
import { MindMap } from '@/types';
import { AddItemForm } from '@/components/shared/AddItemForm';
import { MindMapView } from './MindMapView';

interface MindMapListProps {
  mindMaps: MindMap[];
  setMindMaps: React.Dispatch<React.SetStateAction<MindMap[]>>;
  updateMindMap: (id: number, updates: Partial<MindMap>) => void;
}

export function MindMapList({ mindMaps, setMindMaps, updateMindMap }: MindMapListProps) {
  const addMindMap = (title: string) => {
    const newMindMap: MindMap = {
      id: Date.now(),
      title,
      nodes: [
        {
          id: 'root',
          label: title,
          x: 400,
          y: 300,
          type: 'root',
        }
      ],
      edges: []
    };
    setMindMaps(prev => [...prev, newMindMap]);
  };

  return (
    <div className="space-y-4">
      <AddItemForm onAdd={addMindMap} placeholder="Add a new mind map..." />
      <div className="grid gap-4">
        {mindMaps.map(mindMap => (
          <MindMapView
            key={mindMap.id}
            mindMap={mindMap}
            updateMindMap={updateMindMap}
          />
        ))}
      </div>
    </div>
  );
} 