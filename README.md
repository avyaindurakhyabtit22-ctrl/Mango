# Mango
Mango: AI-powered manga translation with OCR, real-time translation, and dynamic text overlay.  Next.js + Tailwind + Genkit app for translating manga images into any language.  Mango — Upload manga pages, extract text with AI, translate instantly, and preview results side by side.

When you first set up the project locally:
bash - npm install

Then create your .env.local file with your API key:
env -
GOOGLE_API_KEY=your_key_here

And start the dev server:
bash - npm run dev


project structure-
Mango/
├── docs/
│   └── blueprint.md
├── src/
│   ├── ai/
│   │   ├── flows/
│   │   │   ├── extract-text-from-image.ts
│   │   │   ├── improve-translation-quality.ts
│   │   │   ├── multi-speaker-text-to-speech.ts
│   │   │   ├── suggest-target-language.ts
│   │   │   ├── text-to-speech.ts
│   │   │   └── translate-text.ts
│   │   ├── schemas/
│   │   │   ├── extract-text-schemas.ts
│   │   │   ├── improve-translation-schemas.ts
│   │   │   ├── multi-speaker-text-to-speech-schemas.ts
│   │   │   ├── suggest-language-schemas.ts
│   │   │   ├── text-to-speech-schemas.ts
│   │   │   └── translate-text-schemas.ts
│   │   ├── dev.ts
│   │   └── genkit.ts
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── app/
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   └── lib/
│       └── utils.ts
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
