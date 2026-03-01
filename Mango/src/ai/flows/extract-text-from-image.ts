'use server';

/**
 * @fileOverview This file defines a Genkit flow for extracting text from an image.
 *
 * - extractTextFromImage - A function that handles the text extraction process.
 */

import {ai} from '@/ai/genkit';
import type {
  ExtractTextFromImageInput,
  ExtractTextFromImageOutput,
} from '@/ai/schemas/extract-text-schemas';
import {
  ExtractTextFromImageInputSchema,
  ExtractTextFromImageOutputSchema,
} from '@/ai/schemas/extract-text-schemas';

export async function extractTextFromImage(
  input: ExtractTextFromImageInput
): Promise<ExtractTextFromImageOutput> {
  return extractTextFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractTextFromImagePrompt',
  input: {schema: ExtractTextFromImageInputSchema},
  output: {schema: ExtractTextFromImageOutputSchema},
  prompt: `You are an expert at extracting text from manga images.
Your task is to identify all text regions in the provided image and return them with their bounding box coordinates.
Coordinates (x, y, width, height) must be percentages of the total image dimensions.

Image: {{media url=imageDataUri}}`,
});

const extractTextFromImageFlow = ai.defineFlow(
  {
    name: 'extractTextFromImageFlow',
    inputSchema: ExtractTextFromImageInputSchema,
    outputSchema: ExtractTextFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
