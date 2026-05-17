
import { STRATEGIST_PROMPT } from './prompt';
import { STRATEGIST_SCHEMA } from './schema';

export const STRATEGIST_CONFIG = {
  id: 'strategist',
  name: 'Match Strategist',
  model: 'gemini-2.5-flash',
  temperature: 0.7,
  systemInstruction: STRATEGIST_PROMPT,
  responseSchema: STRATEGIST_SCHEMA
};
