import { Type } from '@google/genai';

export const AgentSchemas = {
  DebateContribution: {
    type: Type.OBJECT,
    properties: {
      analysis: { type: Type.STRING, description: "Detailed analytical reasoning" },
      confidence: { type: Type.NUMBER, description: "Confidence level between 0.0 and 1.0" },
      key_factors: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "List of key tactical factors driving this analysis"
      }
    },
    required: ["analysis", "confidence", "key_factors"]
  },

  CaptainDecision: {
    type: Type.OBJECT,
    properties: {
      primary_directive: { type: Type.STRING, description: "Short, elite tactical command" },
      detailed_plan: { type: Type.STRING, description: "Thorough strategic explanation" },
      win_probability_delta: { type: Type.NUMBER, description: "Expected shift in win probability if executed" },
      risk_level: { type: Type.STRING, description: "Low, Moderate, or High" }
    },
    required: ["primary_directive", "detailed_plan", "win_probability_delta", "risk_level"]
  }
};
