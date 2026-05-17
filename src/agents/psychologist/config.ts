
import { PSYCHOLOGIST_PROMPT } from './prompt';
import { PSYCHOLOGIST_SCHEMA } from './schema';

export const PSYCHOLOGIST_CONFIG = {
  id: 'psychologist',
  name: 'Momentum Psychologist',
  model: 'gemini-2.5-flash',
  temperature: 0.7,
  systemInstruction: PSYCHOLOGIST_PROMPT,
  responseSchema: PSYCHOLOGIST_SCHEMA
};
