/**
 * @fileOverview This file defines the Zod schemas and TypeScript types for the
 *   improveTranslationQuality flow.
 *
 * - ImproveTranslationQualityInput - The input type for the improveTranslationQuality function.
 * - ImproveTranslationQualityOutput - The return type for the improveTranslationQuality function.
 * - ImproveTranslationQualityInputSchema - The Zod schema for the input.
 * - ImproveTranslationQualityOutputSchema - The Zod schema for the output.
 */

import {z} from 'genkit';

export const ImproveTranslationQualityInputSchema = z.object({
  originalText: z.string().describe('The original text from the manga.'),
  translatedText: z.string().describe('The current translated text.'),
  userFeedback: z
    .string()
    .describe('User feedback on the translation quality.'),
  targetLanguage: z
    .string()
    .describe('The target language of the translation.'),
});
export type ImproveTranslationQualityInput = z.infer<
  typeof ImproveTranslationQualityInputSchema
>;

export const ImproveTranslationQualityOutputSchema = z.object({
  improvedTranslation: z
    .string()
    .describe('The improved translated text based on user feedback.'),
});
export type ImproveTranslationQualityOutput = z.infer<
  typeof ImproveTranslationQualityOutputSchema
>;
