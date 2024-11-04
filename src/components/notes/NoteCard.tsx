'use client';

import * as React from 'react';
import { Note } from '@/types';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
import type { UnprivilegedEditor } from 'react-quill';
import type Delta from 'quill-delta';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface NoteCardProps {
  note: Note;
  updateContent: (id: number, content: string) => void;
}

export function NoteCard({ note, updateContent }: NoteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{note.title}</h3>
        <Badge variant="secondary">{note.tag}</Badge>
      </div>
      <ReactQuill
        value={note.content}
        onChange={(content: string, delta: Delta, source: string, editor: UnprivilegedEditor) => 
          updateContent(note.id, content)}
        className="h-32"
      />
    </div>
  );
} 