/**
 * @fileOverview This file defines the Zod schemas and TypeScript types for the
 *   suggestTargetLanguage flow.
 *
 * - SuggestTargetLanguageInput - The input type for the suggestTargetLanguage function.
 * - SuggestTargetLanguageOutput - The return type for the suggestTargetLanguage function.
 * - SuggestTargetLanguageInputSchema - The Zod schema for the input.
 * - SuggestTargetLanguageOutputSchema - The Zod schema for the output.
 */

import {z} from 'genkit';

export const SuggestTargetLanguageInputSchema = z.object({
  detectedLanguage: z
    .string()
    .describe('The language automatically detected in the manga.'),
});
export type SuggestTargetLanguageInput = z.infer<
  typeof SuggestTargetLanguageInputSchema
>;

export const SuggestTargetLanguageOutputSchema = z.object({
  suggestedLanguage: z
    .string()
    .describe(
      'The suggested target language for translation based on the detected language.'
    ),
});
export type SuggestTargetLanguageOutput = z.infer<
  typeof SuggestTargetLanguageOutputSchema
>;
