/**
 * @fileOverview This file defines the Zod schemas and TypeScript types for the
 *   multiSpeakerTextToSpeech flow.
 *
 * - MultiSpeakerTextToSpeechInput - The input type for the multiSpeakerTextToSpeech function.
 * - MultiSpeakerTextToSpeechOutput - The return type for the multiSpeakerTextToSpeech function.
 * - MultiSpeakerTextToSpeechInputSchema - The Zod schema for the input.
 * - MultiSpeakerTextToSpeechOutputSchema - The Zod schema for the output.
 */

import {z} from 'genkit';

export const MultiSpeakerTextToSpeechInputSchema = z.object({
  texts: z.array(z.string()).describe('The texts to be converted to speech.'),
});
export type MultiSpeakerTextToSpeechInput = z.infer<typeof MultiSpeakerTextToSpeechInputSchema>;

export const MultiSpeakerTextToSpeechOutputSchema = z.object({
  audioDataUri: z.string().describe('The audio data URI for the speech.'),
});
export type MultiSpeakerTextToSpeechOutput = z.infer<typeof MultiSpeakerTextToSpeechOutputSchema>;
