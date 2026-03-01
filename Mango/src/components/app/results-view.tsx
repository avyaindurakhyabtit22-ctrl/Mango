import { Button } from '@/components/ui/button';
import { TranslatedImage } from '@/components/app/translated-image';
import type { ProcessedResult } from '@/components/app/translated-image';
import { Download, Repeat } from 'lucide-react';

type ResultsViewProps = {
  results: ProcessedResult[];
  onStartOver: () => void;
};

export default function ResultsView({ results, onStartOver }: ResultsViewProps) {
  const handleDownloadAll = () => {
    // This is a placeholder as implementing client-side image generation is complex.
    alert("Download All feature is not yet implemented. You can save images individually by right-clicking them.");
  }
  
  return (
    <div className="w-full max-w-7xl animate-in fade-in-50 duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-headline">Translation Complete!</h2>
          <p className="text-muted-foreground">Review your translated manga pages below.</p>
        </div>
        <div className="flex gap-2 self-stretch sm:self-auto">
            <Button variant="outline" onClick={handleDownloadAll} className="flex-1 sm:flex-none">
                <Download className="mr-2 h-4 w-4"/>
                Download All
            </Button>
            <Button onClick={onStartOver} className="flex-1 sm:flex-none">
                <Repeat className="mr-2 h-4 w-4" />
                Start Over
            </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <TranslatedImage key={index} result={result} />
        ))}
      </div>
    </div>
  );
}
