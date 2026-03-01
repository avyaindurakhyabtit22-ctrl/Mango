'use client';
import { type ChangeEvent, useState, DragEvent, useRef } from 'react';
import { Upload, Languages, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

type FileUploadFormProps = {
  onFilesSelect: (files: File[]) => void;
  onStartTranslation: () => void;
  onLanguageChange: (language: string) => void;
  isTranslating: boolean;
  selectedFileCount: number;
};

const languages = ["English", "Spanish", "French", "German", "Japanese", "Korean", "Chinese", "Hindi", "Arabic", "Portuguese"];

export default function FileUploadForm({ onFilesSelect, onStartTranslation, onLanguageChange, isTranslating, selectedFileCount }: FileUploadFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateFiles = (newFiles: File[]) => {
    const limitedFiles = newFiles.slice(0, 30);
    setFiles(limitedFiles);
    onFilesSelect(limitedFiles);
    // Reset file input value to allow re-uploading the same file
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateFiles(Array.from(e.target.files));
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement | HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      updateFiles(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    updateFiles(newFiles);
  };
  
  return (
    <Card className="w-full max-w-2xl shadow-lg animate-in fade-in-50 duration-300" onDragEnter={handleDrag}>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Upload Your Manga</CardTitle>
        <CardDescription>Select up to 30 images to start the translation process.</CardDescription>
      </CardHeader>
      <CardContent onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
        {files.length === 0 ? (
          <label
            htmlFor="file-upload"
            className={cn(
              "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
              isDragging ? "border-primary bg-accent/20" : "border-border hover:border-primary/50 hover:bg-accent/10"
            )}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (max 30 files)</p>
            </div>
            <input ref={fileInputRef} id="file-upload" type="file" multiple accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleFileChange} />
          </label>
        ) : (
          <div>
            <ScrollArea className="h-64 w-full rounded-md border p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {files.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="relative group bg-secondary/50 p-2 rounded-md">
                    <div className="flex items-center gap-2">
                      <FileText className="h-6 w-6 text-muted-foreground shrink-0" />
                      <p className="text-sm truncate font-medium">{file.name}</p>
                    </div>
                    <button onClick={() => removeFile(index)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
                      <X className="h-4 w-4" />
                       <span className="sr-only">Remove {file.name}</span>
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
             <p className="text-center text-sm text-muted-foreground mt-2">Drag and drop or <label htmlFor="file-upload-replace" className="text-primary font-semibold cursor-pointer hover:underline">browse</label> to replace files.</p>
             <input ref={fileInputRef} id="file-upload-replace" type="file" multiple accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleFileChange} />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Languages className="h-5 w-5 text-muted-foreground" />
          <Select defaultValue="English" onValueChange={onLanguageChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Target Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={onStartTranslation}
          disabled={selectedFileCount === 0 || isTranslating}
          className="w-full sm:w-auto"
          size="lg"
        >
          {isTranslating ? 'Processing...' : `Translate ${selectedFileCount} File${selectedFileCount !== 1 ? 's' : ''}`}
        </Button>
      </CardFooter>
      {isDragging && <div className="absolute inset-0 bg-primary/10 rounded-lg pointer-events-none" onDrop={handleDrop}></div>}
    </Card>
  );
}
