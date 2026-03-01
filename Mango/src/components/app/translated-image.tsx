import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { useState } from 'react';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { multiSpeakerTextToSpeech } from '@/ai/flows/multi-speaker-text-to-speech';
import { Volume2, Loader2, BookAudio } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

export type TextRegion = { text: string; coordinates: { x: number; y: number; width: number; height: number } };
export type ProcessedResult = { imageUrl: string; translations: TextRegion[], targetLanguage: string };

type TranslatedImageProps = {
  result: ProcessedResult;
};

const languageDirection: Record<string, 'ltr' | 'rtl'> = {
  Arabic: 'rtl',
  Hebrew: 'rtl',
  Urdu: 'rtl',
  Hindi: 'ltr',
  Japanese: 'ltr',
  Korean: 'ltr',
  Chinese: 'ltr',
  English: 'ltr',
  Spanish: 'ltr',
  French: 'ltr',
  German: 'ltr',
  Portuguese: 'ltr',
};

type AudioState = {
  [key: number]: {
    isLoading: boolean;
    audioDataUri?: string;
  };
};

type AllAudioState = {
  isLoading: boolean;
  audioDataUri?: string;
};

export function TranslatedImage({ result }: TranslatedImageProps) {
  const [audioState, setAudioState] = useState<AudioState>({});
  const [allAudioState, setAllAudioState] = useState<AllAudioState>({ isLoading: false });
  const { toast } = useToast();

  const handlePlayAudio = async (text: string, index: number) => {
    if (audioState[index]?.audioDataUri) {
      const audio = new Audio(audioState[index].audioDataUri);
      audio.play();
      return;
    }

    setAudioState((prev) => ({ ...prev, [index]: { isLoading: true } }));

    try {
      const { audioDataUri } = await textToSpeech({ text });
      setAudioState((prev) => ({ ...prev, [index]: { isLoading: false, audioDataUri } }));
      const audio = new Audio(audioDataUri);
      audio.play();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Audio Playback Failed',
        description: 'Could not generate audio for the selected text.',
      });
      setAudioState((prev) => ({ ...prev, [index]: { isLoading: false } }));
    }
  };

  const handlePlayAllAudio = async () => {
    if (allAudioState.audioDataUri) {
      const audio = new Audio(allAudioState.audioDataUri);
      audio.play();
      return;
    }

    setAllAudioState({ isLoading: true });

    try {
      const texts = result.translations.map(r => r.text);
      if (texts.length === 0) {
        setAllAudioState({ isLoading: false });
        return;
      }
      const { audioDataUri } = await multiSpeakerTextToSpeech({ texts });
      setAllAudioState({ isLoading: false, audioDataUri });
      const audio = new Audio(audioDataUri);
audio.play();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Audio Playback Failed',
        description: 'Could not generate audio for all text.',
      });
      setAllAudioState({ isLoading: false });
    }
  };
  
  const direction = languageDirection[result.targetLanguage] || 'ltr';

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={result.imageUrl}
            alt="Translated Manga Page"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover bg-secondary"
            data-ai-hint="manga page"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 text-white bg-black/30 hover:bg-black/50 hover:text-white z-10"
            onClick={handlePlayAllAudio}
            disabled={allAudioState.isLoading}
            aria-label="Read all text"
          >
            {allAudioState.isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <BookAudio className="h-5 w-5" />
            )}
          </Button>
          {result.translations.map((region, i) => (
            <div
              key={i}
              className="absolute group/region flex items-center justify-center bg-white p-1 text-black font-bold text-center leading-tight"
              style={{
                left: `${region.coordinates.x}%`,
                top: `${region.coordinates.y}%`,
                width: `${region.coordinates.width}%`,
                height: `${region.coordinates.height}%`,
                fontSize: 'clamp(6px, 1.6vmin, 14px)',
                boxSizing: 'border-box',
                direction: direction,
              }}
            >
              <div className="p-1">
                <span>{region.text}</span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-0 right-0 h-6 w-6 text-black/50 hover:text-black hover:bg-transparent opacity-0 group-hover/region:opacity-100 transition-opacity"
                onClick={() => handlePlayAudio(region.text, i)}
                disabled={audioState[i]?.isLoading}
              >
                {audioState[i]?.isLoading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
                <span className="sr-only">Read text</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
