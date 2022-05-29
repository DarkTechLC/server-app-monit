import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen container mx-auto px-4 transition-colors bg-zinc-100 dark:bg-zinc-900">
      {children}
    </div>
  );
}

export function Header({ children }: { children: ReactNode }) {
  return (
    <header className="flex items-center justify-between py-4 sticky top-0 z-50 transition-colors bg-zinc-100 dark:bg-zinc-900">
      {children}
    </header>
  );
}
