import { Type, Schema } from '@google/genai';

export const GeminiTools = {
  getPitchDeterioration: {
    name: 'getPitchDeterioration',
    description: 'Calculates live pitch deterioration metrics',
    parameters: {
      type: Type.OBJECT,
      properties: {
        venueId: { type: Type.STRING },
        overNumber: { type: Type.NUMBER }
      }
    }
  },
  analyzeGrip: {
    name: 'analyzeGrip',
    description: 'Trigger multimodal vision processing on bowler hand grip',
    parameters: {
      type: Type.OBJECT,
      properties: {
        cameraId: { type: Type.STRING },
        timestamp: { type: Type.STRING }
      }
    }
  }
};
