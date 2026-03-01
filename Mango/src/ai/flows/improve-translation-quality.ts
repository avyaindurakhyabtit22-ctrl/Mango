'use server';

/**
 * @fileOverview This file defines a Genkit flow to improve translation quality based on user feedback.
 *
 * - improveTranslationQuality - A function that handles the translation improvement process.
 */

import {ai} from '@/ai/genkit';
import type {
  ImproveTranslationQualityInput,
  ImproveTranslationQualityOutput,
} from '@/ai/schemas/improve-translation-schemas';
import {
  ImproveTranslationQualityInputSchema,
  ImproveTranslationQualityOutputSchema,
} from '@/ai/schemas/improve-translation-schemas';

export async function improveTranslationQuality(
  input: ImproveTranslationQualityInput
): Promise<ImproveTranslationQualityOutput> {
  return improveTranslationQualityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveTranslationQualityPrompt',
  input: {schema: ImproveTranslationQualityInputSchema},
  output: {schema: ImproveTranslationQualityOutputSchema},
  prompt: `You are a translation expert specializing in manga content.

  The user has provided feedback on a translated text and wants to improve the translation quality.
  Based on the original text, the current translated text, and the user feedback, generate an improved translation that is more accurate and natural-sounding.
  The target language is {{{targetLanguage}}}.

  Original text: {{{originalText}}}
  Current translation: {{{translatedText}}}
  User feedback: {{{userFeedback}}}

  Improved translation:`,
});

const improveTranslationQualityFlow = ai.defineFlow(
  {
    name: 'improveTranslationQualityFlow',
    inputSchema: ImproveTranslationQualityInputSchema,
    outputSchema: ImproveTranslationQualityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      improvedTranslation: output!.improvedTranslation,
    };
  }
);
