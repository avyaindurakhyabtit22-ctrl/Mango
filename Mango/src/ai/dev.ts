'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/improve-translation-quality.ts';
import '@/ai/flows/suggest-target-language.ts';
import '@/ai/flows/translate-text.ts';
import '@/ai/flows/extract-text-from-image.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/multi-speaker-text-to-speech.ts';
