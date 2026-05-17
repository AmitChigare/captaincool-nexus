
import { Type } from '@google/genai';
export const PITCH_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    analysis: { type: Type.STRING, description: "Detailed Pitch & Conditions Analyst reasoning" },
    confidence: { type: Type.NUMBER, description: "Confidence score 0.0 - 1.0" },
    key_factors: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["analysis", "confidence", "key_factors"]
};
