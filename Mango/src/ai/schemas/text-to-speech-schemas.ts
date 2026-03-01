/**
 * @fileOverview This file defines the Zod schemas and TypeScript types for the
 *   textToSpeech flow.
 *
 * - TextToSpeechInput - The input type for the textToSpeech function.
 * - TextToSpeechOutput - The return type for the textToSpeech function.
 * - TextToSpeechInputSchema - The Zod schema for the input.
 * - TextToSpeechOutputSchema - The Zod schema for the output.
 */

import {z} from 'genkit';

export const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

export const TextToSpeechOutputSchema = z.object({
  audioDataUri: z.string().describe('The audio data URI for the speech.'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;
