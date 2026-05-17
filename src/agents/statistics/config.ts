
import { STATISTICS_PROMPT } from './prompt';
import { STATISTICS_SCHEMA } from './schema';

export const STATISTICS_CONFIG = {
  id: 'statistics',
  name: 'Statistical Intelligence Agent',
  model: 'gemini-2.5-flash',
  temperature: 0.7,
  systemInstruction: STATISTICS_PROMPT,
  responseSchema: STATISTICS_SCHEMA
};
