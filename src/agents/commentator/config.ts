
import { COMMENTATOR_PROMPT } from './prompt';
import { COMMENTATOR_SCHEMA } from './schema';

export const COMMENTATOR_CONFIG = {
  id: 'commentator',
  name: 'Commentary Narrator',
  model: 'gemini-2.5-flash',
  temperature: 0.7,
  systemInstruction: COMMENTATOR_PROMPT,
  responseSchema: COMMENTATOR_SCHEMA
};
