'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/app/header';
import FileUploadForm from '@/components/app/file-upload-form';
import ProcessingView from '@/components/app/processing-view';
import ResultsView from '@/components/app/results-view';
import type { ProcessedResult } from '@/components/app/translated-image';
import { translateText } from '@/ai/flows/translate-text';
import { extractTextFromImage } from '@/ai/flows/extract-text-from-image';

// Helper to convert a File to a data URI
async function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

type AppStep = 'upload' | 'processing' | 'results';

export default function Home() {
  const [step, setStep] = useState<AppStep>('upload');
  const [files, setFiles] = useState<File[]>([]);
  const [processedResults, setProcessedResults] = useState<ProcessedResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [targetLanguage, setTargetLanguage] = useState('English');
  const { toast } = useToast();

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const startTranslation = async () => {
    if (files.length === 0) return;
    setStep('processing');
    setProcessedResults([]);
    setProgress(0);
    setCurrentFileIndex(0);

    const results: ProcessedResult[] = [];
    const objectUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setCurrentFileIndex(i + 1);
      try {
        const imageDataUri = await fileToDataUri(file);
        
        const ocrResult = await extractTextFromImage({ imageDataUri });
        const originalTexts = ocrResult.text_regions.map(r => r.text);
        
        if (originalTexts.length === 0) {
          const imageUrl = URL.createObjectURL(file);
          objectUrls.push(imageUrl);
          results.push({ imageUrl, translations: [], targetLanguage });
          setProgress(((i + 1) / files.length) * 100);
          continue;
        }

        const translationResult = await translateText({ texts: originalTexts, targetLanguage });
        const translatedTexts = translationResult.translatedTexts;
        
        const translations = ocrResult.text_regions.map((region, index) => ({
          ...region,
          text: translatedTexts[index] || originalTexts[index],
        }));

        const imageUrl = URL.createObjectURL(file);
        objectUrls.push(imageUrl);

        results.push({ imageUrl, translations, targetLanguage });
        setProgress(((i + 1) / files.length) * 100);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Translation Failed",
          description: `An error occurred while processing ${file.name}. Please try again.`,
        });
        // Clean up any URLs created so far
        objectUrls.forEach(url => URL.revokeObjectURL(url));
        handleStartOver();
        return;
      }
    }

    setProcessedResults(results);
    setStep('results');
  };
  
  const handleStartOver = () => {
    // Clean up object URLs to prevent memory leaks
    processedResults.forEach(result => URL.revokeObjectURL(result.imageUrl));
    setStep('upload');
    setFiles([]);
    setProcessedResults([]);
    setProgress(0);
    setCurrentFileIndex(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center">
        {step === 'upload' && (
          <FileUploadForm
            onFilesSelect={handleFilesSelect}
            onStartTranslation={startTranslation}
            onLanguageChange={setTargetLanguage}
            isTranslating={step === 'processing'}
            selectedFileCount={files.length}
          />
        )}
        {step === 'processing' && (
          <ProcessingView 
            progress={progress}
            totalFiles={files.length}
            currentFile={currentFileIndex}
          />
        )}
        {step === 'results' && (
          <ResultsView
            results={processedResults}
            onStartOver={handleStartOver}
          />
        )}
      </main>
    </div>
  );
}
