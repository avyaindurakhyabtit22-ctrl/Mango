'use server';

/**
 * @fileOverview A flow to suggest a target language based on the manga's detected language.
 *
 * - suggestTargetLanguage - A function that suggests a target language.
 */

import {ai} from '@/ai/genkit';
import type {
  SuggestTargetLanguageInput,
  SuggestTargetLanguageOutput,
} from '@/ai/schemas/suggest-language-schemas';
import {
  SuggestTargetLanguageInputSchema,
  SuggestTargetLanguageOutputSchema,
} from '@/ai/schemas/suggest-language-schemas';

export async function suggestTargetLanguage(
  input: SuggestTargetLanguageInput
): Promise<SuggestTargetLanguageOutput> {
  return suggestTargetLanguageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTargetLanguagePrompt',
  input: {schema: SuggestTargetLanguageInputSchema},
  output: {schema: SuggestTargetLanguageOutputSchema},
  prompt: `Based on the detected manga language "{{{detectedLanguage}}}", suggest a suitable target language for translation. Consider common translation pairings. Return only the language name. For example, if the detected language is Japanese, a good target language would be English. No explanation is necessary.`,
});

const suggestTargetLanguageFlow = ai.defineFlow(
  {
    name: 'suggestTargetLanguageFlow',
    inputSchema: SuggestTargetLanguageInputSchema,
    outputSchema: SuggestTargetLanguageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
