
import { DEVILS_ADVOCATE_PROMPT } from './prompt';
import { DEVILS_ADVOCATE_SCHEMA } from './schema';

export const DEVILS_ADVOCATE_CONFIG = {
  id: 'devils_advocate',
  name: 'Devil’s Advocate',
  model: 'gemini-2.5-flash',
  temperature: 0.7,
  systemInstruction: DEVILS_ADVOCATE_PROMPT,
  responseSchema: DEVILS_ADVOCATE_SCHEMA
};
