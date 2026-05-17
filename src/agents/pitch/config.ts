
import { PITCH_PROMPT } from './prompt';
import { PITCH_SCHEMA } from './schema';

export const PITCH_CONFIG = {
  id: 'pitch',
  name: 'Pitch & Conditions Analyst',
  model: 'gemini-2.5-flash',
  temperature: 0.7,
  systemInstruction: PITCH_PROMPT,
  responseSchema: PITCH_SCHEMA
};
