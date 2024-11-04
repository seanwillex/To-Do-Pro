'use client';

import * as React from 'react';
import { Note } from '@/types';
import { 
  Badge,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface NoteCardProps {
  note: Note;
  updateContent: (id: number, content: string) => void;
}

export function NoteCard({ note, updateContent }: NoteCardProps) {
  return (
    <Accordion type="single" collapsible className="bg-background rounded-lg border">
      <AccordionItem value={`note-${note.id}`} className="border-none">
        <AccordionTrigger className="px-4 py-2 hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <h3 className="font-semibold text-left">{note.title}</h3>
            <Badge variant="secondary" className="ml-2">{note.tag}</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="min-h-[200px] border rounded-md">
            <ReactQuill
              value={note.content}
              onChange={(content) => updateContent(note.id, content)}
              className="h-full"
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link', 'code-block'],
                  ['clean']
                ],
              }}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
} 