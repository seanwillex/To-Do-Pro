'use client';

import * as React from 'react';
import { Note } from '@/types';
import { AddItemForm } from '@/components/shared/AddItemForm';
import { NoteCard } from './NoteCard';

interface NoteListProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  updateNoteContent: (id: number, content: string) => void;
}

export function NoteList({ notes, setNotes, updateNoteContent }: NoteListProps) {
  const addNote = (title: string) => {
    const newNote: Note = {
      id: Date.now(),
      title,
      content: '',
      tag: 'general'
    };
    setNotes((prev: Note[]) => [...prev, newNote]);
  };

  return (
    <div>
      <div className="mb-4">
        <AddItemForm onAdd={addNote} placeholder="Add a new note..." />
      </div>
      <div className="grid gap-4">
        {notes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            updateContent={updateNoteContent}
          />
        ))}
      </div>
    </div>
  );
} 