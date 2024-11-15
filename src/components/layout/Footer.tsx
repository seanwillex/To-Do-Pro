'use client';

import * as React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn(
      "h-16 bg-background border-t flex items-center justify-center",
      className
    )}>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Personal Development Pro. All rights reserved.
      </p>
    </footer>
  );
} 