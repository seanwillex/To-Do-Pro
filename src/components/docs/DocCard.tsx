'use client';

import * as React from 'react';
import { Doc } from '@/types';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface DocCardProps {
  doc: Doc;
  updateContent: (id: number, content: string) => void;
}

export function DocCard({ doc, updateContent }: DocCardProps) {
  return (
    <Accordion type="single" collapsible className="bg-background rounded-lg border">
      <AccordionItem value={`doc-${doc.id}`} className="border-none">
        <AccordionTrigger className="px-4 py-2 hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="font-semibold text-left">{doc.title}</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: {format(new Date(doc.lastUpdated), 'MMM d, yyyy')}
              </p>
            </div>
            <Badge variant="outline" className="ml-2">{doc.category}</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="min-h-[400px] border rounded-md">
            <ReactQuill
              value={doc.content}
              onChange={(content) => updateContent(doc.id, content)}
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