import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type ProcessingViewProps = {
  progress: number;
  totalFiles: number;
  currentFile: number;
};

export default function ProcessingView({ progress, totalFiles, currentFile }: ProcessingViewProps) {
  return (
    <Card className="w-full max-w-lg shadow-lg animate-in fade-in-50 duration-300">
      <CardHeader className="items-center text-center">
        <CardTitle className="text-2xl font-headline">Translating Your Manga...</CardTitle>
        <CardDescription>Please wait while our AI works its magic.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-8">
        <Progress value={progress} className="w-full" />
        <p className="text-muted-foreground text-sm font-medium">
          {progress < 100 ? `Processing file ${currentFile} of ${totalFiles}` : 'Finalizing...'}
        </p>
      </CardContent>
    </Card>
  );
}
