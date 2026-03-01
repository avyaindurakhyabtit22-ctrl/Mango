import { Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="py-6 px-4 md:px-6 border-b">
      <div className="container mx-auto flex items-center gap-3">
        <Zap className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
          MangaTalk
        </h1>
      </div>
    </header>
  );
}
