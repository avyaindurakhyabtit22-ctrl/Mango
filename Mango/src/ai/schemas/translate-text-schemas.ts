/**
 * @fileOverview This file defines the Zod schemas and TypeScript types for the
 *   translateText flow.
 *
 * - TranslateTextInput - The input type for the translateText function.
 * - TranslateTextOutput - The return type for the translateText function.
 * - TranslateTextInputSchema - The Zod schema for the input.
 * - TranslateTextOutputSchema - The Zod schema for the output.
 */

import {z} from 'genkit';

export const TranslateTextInputSchema = z.object({
  texts: z.array(z.string()).describe('An array of texts to be translated.'),
  targetLanguage: z
    .string()
    .describe('The target language for the translation.'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

export const TranslateTextOutputSchema = z.object({
  translatedTexts: z
    .array(z.string())
    .describe('The array of translated texts.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;
