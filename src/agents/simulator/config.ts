
import { SIMULATOR_PROMPT } from './prompt';
import { SIMULATOR_SCHEMA } from './schema';

export const SIMULATOR_CONFIG = {
  id: 'simulator',
  name: 'Tactical Simulator',
  model: 'gemini-2.5-pro',
  temperature: 0.2,
  systemInstruction: SIMULATOR_PROMPT,
  responseSchema: SIMULATOR_SCHEMA
};
