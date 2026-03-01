'use server';

/**
 * @fileOverview A flow to convert text from multiple speakers to speech.
 *
 * - multiSpeakerTextToSpeech - A function that converts text to speech.
 */
import {ai} from '@/ai/genkit';
import type { MultiSpeakerTextToSpeechInput } from '@/ai/schemas/multi-speaker-text-to-speech-schemas';
import {
  MultiSpeakerTextToSpeechInputSchema,
  MultiSpeakerTextToSpeechOutputSchema,
} from '@/ai/schemas/multi-speaker-text-to-speech-schemas';
import {googleAI} from '@genkit-ai/googleai';
import wav from 'wav';

export async function multiSpeakerTextToSpeech(input: MultiSpeakerTextToSpeechInput) {
  return multiSpeakerTextToSpeechFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const availableVoices = ['Algenib', 'Achernar', 'Sirius', 'Canopus'];

const multiSpeakerTextToSpeechFlow = ai.defineFlow(
  {
    name: 'multiSpeakerTextToSpeechFlow',
    inputSchema: MultiSpeakerTextToSpeechInputSchema,
    outputSchema: MultiSpeakerTextToSpeechOutputSchema,
  },
  async ({ texts }) => {
    if (texts.length === 1) {
      // Handle single text case separately to avoid multi-speaker issues.
      const {media} = await ai.generate({
        model: googleAI.model('gemini-2.5-flash-preview-tts'),
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {voiceName: availableVoices[0]},
            },
          },
        },
        prompt: texts[0],
      });
      if (!media) {
        throw new Error('no media returned');
      }
      const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
      );
      return {
        audioDataUri: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
      };
    }
    
    // Generate a prompt where each text is assigned to a speaker.
    const prompt = texts.map((text, index) => `Speaker${(index % availableVoices.length) + 1}: ${text}`).join('\n');
    const uniqueSpeakers = Math.min(texts.length, availableVoices.length);
    const speakerVoiceConfigs = Array.from({ length: uniqueSpeakers }, (_, index) => ({
      speaker: `Speaker${index + 1}`,
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: availableVoices[index] },
      },
    }));
    
    const {media} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          multiSpeakerVoiceConfig: {
            speakerVoiceConfigs,
          },
        },
      },
      prompt: prompt,
    });

    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      audioDataUri: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);
