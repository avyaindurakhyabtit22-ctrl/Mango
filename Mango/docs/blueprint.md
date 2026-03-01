# **App Name**: MangaTalk

## Core Features:

- Image Upload and Processing: Allows users to upload manga images for translation. Accepts up to 30 images for batch processing.
- AI-Powered Text Extraction: Leverages the base44 InvokeLLM integration tool to perform OCR on manga images, accurately identifying text within speech bubbles and extracting coordinate data.
- Real-time Translation: Utilizes the base44 InvokeLLM integration tool to translate extracted text into the user's chosen language, ensuring context and meaning are preserved.
- Dynamic Text Overlay: Overlays the translated text onto the original manga image using absolute positioning based on AI-detected coordinates.  
- Visual Preview: Presents a clear, side-by-side comparison of the original and translated manga pages for immediate review.
- Progress Tracking: Displays a progress bar to keep users informed during the image processing and translation phases.
- Error Handling: Implements robust error handling to gracefully manage upload failures, API errors, and other unexpected issues, guiding users back to the upload screen.

## Style Guidelines:

- Primary color: Deep Indigo (#6666FF), evoking a sense of technology and imagination.
- Background color: Very light Indigo (#F0F0FF) to ensure a clean, readable interface.
- Accent color: Vibrant Violet (#D066FF), for highlighting interactive elements.
- Body and headline font: 'Inter', a grotesque-style sans-serif for a modern, readable interface.
- Use simple, clear icons from Lucide React to represent actions like upload, translate, and download.
- Maintain a clean and structured layout using shadcn/ui components, ensuring ease of use.
- Incorporate subtle transitions and loading animations to enhance user engagement.