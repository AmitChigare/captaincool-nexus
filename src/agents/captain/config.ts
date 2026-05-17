
import { CAPTAIN_PROMPT } from './prompt';
import { CAPTAIN_SCHEMA } from './schema';

export const CAPTAIN_CONFIG = {
  id: 'captain',
  name: 'Captain Persona Engine',
  model: 'gemini-2.5-pro',
  temperature: 0.2,
  systemInstruction: CAPTAIN_PROMPT,
  responseSchema: CAPTAIN_SCHEMA
};
