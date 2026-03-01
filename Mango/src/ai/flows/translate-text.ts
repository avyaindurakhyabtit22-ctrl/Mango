'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating text.
 *
 * - translateText - A function that handles the text translation process.
 */

import {ai} from '@/ai/genkit';
import type {
  TranslateTextInput,
  TranslateTextOutput,
} from '@/ai/schemas/translate-text-schemas';
import {
  TranslateTextInputSchema,
  TranslateTextOutputSchema,
} from '@/ai/schemas/translate-text-schemas';

export async function translateText(
  input: TranslateTextInput
): Promise<TranslateTextOutput> {
  return translateTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: {schema: TranslateTextInputSchema},
  output: {schema: TranslateTextOutputSchema},
  prompt: `You are a master translator specializing in manga. Translate the following texts to {{{targetLanguage}}}.
Provide a natural and accurate translation suitable for the context of a manga.
Return the translations in the same order as the input.
If a text block does not contain meaningful text to translate (e.g., it's just a symbol or empty), return an empty string for that block.
Only return the translated texts, nothing else.

{{#each texts}}
- {{{this}}}
{{/each}}
`,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async input => {
    if (input.texts.length === 0) {
      return {translatedTexts: []};
    }
    const {output} = await prompt(input);
    return output!;
  }
);
