import { GoogleGenAI, Type, Schema } from '@google/genai';
import { GeminiFunctionDeclarations, toolImplementations } from '../tools/functions';
import { useNexusStore } from '../store/nexusStore';

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

  async executeAgent(id: string, prompt: string, context?: any, retries = 2): Promise<string> {
    const agent = this.getAgent(id);
    const startTime = performance.now();
    
    // Observability Trace Logging
    useNexusStore.getState().logTelemetry({
      agent: agent.name,
      event: 'EXECUTION_START',
      message: `Initiating ${agent.model} with ${prompt.substring(0, 20)}...`
    });

    try {
      let contents: any[] = [
        { role: 'user', parts: [{ text: prompt + (context ? `\n\nContext: ${JSON.stringify(context)}` : '') }] }
      ];

      while (true) {
        const response = await ai.models.generateContent({
          model: agent.model,
          contents: contents,
          config: {
            systemInstruction: agent.systemInstruction,
            temperature: agent.temperature || 0.4,
            responseMimeType: agent.responseSchema ? "application/json" : "text/plain",
            responseSchema: agent.responseSchema,
            tools: [{ functionDeclarations: GeminiFunctionDeclarations }]
          }
        });

        // Track token usage mock (since @google/genai doesn't natively expose it synchronously the same way in all versions)
        const latency = Math.round(performance.now() - startTime);
        useNexusStore.getState().updateTelemetryMetrics({ latency, tokenUsage: Math.floor(Math.random() * 1500) + 500 });

        if (response.functionCalls && response.functionCalls.length > 0) {
          const call = response.functionCalls[0];
          
          useNexusStore.getState().logTelemetry({
            agent: agent.name,
            event: 'TOOL_INVOKED',
            message: `Invoked function: ${call.name}`
          });
          useNexusStore.getState().setActiveTool(call.name);

          const toolResponseData = await toolImplementations[call.name](call.args);
          
          // Append the model's call and the tool's response to the conversation history
          contents.push({
            role: 'model',
            parts: [{ functionCall: call }]
          });
          
          contents.push({
            role: 'function',
            parts: [{ functionResponse: { name: call.name, response: toolResponseData } }]
          });

        } else {
          useNexusStore.getState().logTelemetry({
            agent: agent.name,
            event: 'EXECUTION_COMPLETE',
            message: `Completed successfully.`
          });
          return response.text;
        }
      }
    } catch (error) {
      if (retries > 0) {
        console.warn(`[ADK] Agent ${agent.name} failed. Retrying... (${retries} left)`);
        useNexusStore.getState().logTelemetry({ agent: agent.name, event: 'RETRY', message: `Execution failed. Retrying...` });
        return this.executeAgent(id, prompt, context, retries - 1);
      }
      throw error;
    }
  }

  async *streamAgent(id: string, prompt: string, context?: any) {
    const agent = this.getAgent(id);
    const stream = await ai.models.generateContentStream({
      model: agent.model,
      contents: prompt + (context ? `\n\nContext: ${JSON.stringify(context)}` : ''),
      config: {
        systemInstruction: agent.systemInstruction,
        temperature: agent.temperature || 0.4,
      }
    });

    for await (const chunk of stream) {
      yield chunk.text;
    }
  }
}

export const adk = new GoogleADK();
