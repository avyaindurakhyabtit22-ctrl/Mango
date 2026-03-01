/**
 * @fileOverview This file defines the Zod schemas and TypeScript types for the
 *   extractTextFromImage flow.
 *
 * - ExtractTextFromImageInput - The input type for the extractTextFromImage function.
 * - ExtractTextFromImageOutput - The return type for the extractTextFromImage function.
 * - ExtractTextFromImageInputSchema - The Zod schema for the input.
 * - ExtractTextFromImageOutputSchema - The Zod schema for the output.
 */

import {z} from 'genkit';

const TextRegionSchema = z.object({
  text: z.string().describe('The extracted text from a region of the image.'),
  coordinates: z
    .object({
      x: z
        .number()
        .describe(
          'The x-coordinate of the top-left corner of the bounding box as a percentage of the image width.'
        ),
      y: z
        .number()
        .describe(
          'The y-coordinate of the top-left corner of the bounding box as a percentage of the image height.'
        ),
      width: z
        .number()
        .describe(
          'The width of the bounding box as a percentage of the image width.'
        ),
      height: z
        .number()
        .describe(
          'The height of the bounding box as a percentage of the image height.'
        ),
    })
    .describe('The bounding box coordinates of the extracted text.'),
});

export const ExtractTextFromImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a manga page, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractTextFromImageInput = z.infer<
  typeof ExtractTextFromImageInputSchema
>;

export const ExtractTextFromImageOutputSchema = z.object({
  text_regions: z
    .array(TextRegionSchema)
    .describe('An array of text regions found in the image.'),
});
export type ExtractTextFromImageOutput = z.infer<
  typeof ExtractTextFromImageOutputSchema
>;
