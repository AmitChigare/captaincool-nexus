import { GoogleGenAI, Type, Schema } from '@google/genai';

// Initialize the Google GenAI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export interface AgentConfig {
  id: string;
  name: string;
  model: string;
  role: string;
  systemInstruction: string;
  temperature?: number;
  responseSchema?: Schema;
}

export class GoogleADK {
  private registry: Map<string, AgentConfig> = new Map();

  registerAgent(config: AgentConfig) {
    this.registry.set(config.id, config);
    console.log(`[ADK] Registered agent: ${config.name} (${config.model})`);
  }

  getAgent(id: string): AgentConfig {
    const agent = this.registry.get(id);
    if (!agent) throw new Error(`Agent ${id} not found in ADK registry`);
    return agent;
  }

  async executeAgent(id: string, prompt: string, context?: any) {
    const agent = this.getAgent(id);
    
    // Add telemetry and observability tracking here
    console.log(`[ADK][Execute] Agent ${agent.name} starting...`);

    const response = await ai.models.generateContent({
      model: agent.model,
      contents: prompt + (context ? `\n\nContext: ${JSON.stringify(context)}` : ''),
      config: {
        systemInstruction: agent.systemInstruction,
        temperature: agent.temperature || 0.4,
        responseMimeType: agent.responseSchema ? "application/json" : "text/plain",
        responseSchema: agent.responseSchema,
      }
    });

    return response.text;
  }

  async *streamAgent(id: string, prompt: string, context?: any) {
    const agent = this.getAgent(id);
    
    console.log(`[ADK][Stream] Agent ${agent.name} starting...`);

    const responseStream = await ai.models.generateContentStream({
      model: agent.model,
      contents: prompt + (context ? `\n\nContext: ${JSON.stringify(context)}` : ''),
      config: {
        systemInstruction: agent.systemInstruction,
        temperature: agent.temperature || 0.4,
      }
    });

    for await (const chunk of responseStream) {
      yield chunk.text;
    }
  }
}

export const adk = new GoogleADK();
