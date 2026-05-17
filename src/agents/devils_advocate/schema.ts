
import { Type } from '@google/genai';
export const DEVILS_ADVOCATE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    analysis: { type: Type.STRING, description: "Detailed Devil’s Advocate reasoning" },
    confidence: { type: Type.NUMBER, description: "Confidence score 0.0 - 1.0" },
    key_factors: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["analysis", "confidence", "key_factors"]
};
