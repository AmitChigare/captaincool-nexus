const fs = require('fs');
const path = require('path');

const agents = [
  {
    id: 'strategist',
    name: 'Match Strategist',
    role: 'proposes tactical cricket decisions, chooses bowling changes, recommends batting order shifts, handles powerplay/death-over planning',
    model: 'gemini-2.5-flash',
  },
  {
    id: 'statistics',
    name: 'Statistical Intelligence Agent',
    role: 'matchup analytics, phase economy analysis, historical venue patterns, expected run projections',
    model: 'gemini-2.5-flash',
  },
  {
    id: 'pitch',
    name: 'Pitch & Conditions Analyst',
    role: 'analyzes dew, pitch deterioration, grip, bounce, weather effects, boundary dimensions',
    model: 'gemini-2.5-flash',
  },
  {
    id: 'psychologist',
    name: 'Momentum Psychologist',
    role: 'pressure swings, choke detection, momentum volatility, crowd pressure analysis, captain stress evaluation',
    model: 'gemini-2.5-flash',
  },
  {
    id: 'devils_advocate',
    name: 'Devil’s Advocate',
    role: 'aggressively challenge tactical decisions, force reasoning revisions, identify strategic weaknesses',
    model: 'gemini-2.5-flash',
  },
  {
    id: 'captain',
    name: 'Captain Persona Engine',
    role: 'emulate tactical tendencies of Dhoni, Rohit, Kohli, Gambhir, Hardik, Cummins',
    model: 'gemini-2.5-pro',
  },
  {
    id: 'simulator',
    name: 'Tactical Simulator',
    role: 'simulate alternate tactical futures, project wicket probability, expected over outcomes, win probability shifts',
    model: 'gemini-2.5-pro',
  },
  {
    id: 'commentator',
    name: 'Commentary Narrator',
    role: 'convert AI reasoning into elite IPL commentary language',
    model: 'gemini-2.5-flash',
  }
];

const srcDir = path.join(__dirname, 'src');

agents.forEach(agent => {
  const agentDir = path.join(srcDir, 'agents', agent.id);
  fs.mkdirSync(agentDir, { recursive: true });

  // 1. Prompt File
  fs.writeFileSync(path.join(agentDir, 'prompt.ts'), `
export const ${agent.id.toUpperCase()}_PROMPT = \`You are the ${agent.name}.
Your role is to: ${agent.role}.
Always base your output on live match context and adhere strictly to your persona.\`;
`);

  // 2. Schema File
  fs.writeFileSync(path.join(agentDir, 'schema.ts'), `
import { Type } from '@google/genai';
export const ${agent.id.toUpperCase()}_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    analysis: { type: Type.STRING, description: "Detailed ${agent.name} reasoning" },
    confidence: { type: Type.NUMBER, description: "Confidence score 0.0 - 1.0" },
    key_factors: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["analysis", "confidence", "key_factors"]
};
`);

  // 3. Configuration File
  fs.writeFileSync(path.join(agentDir, 'config.ts'), `
import { ${agent.id.toUpperCase()}_PROMPT } from './prompt';
import { ${agent.id.toUpperCase()}_SCHEMA } from './schema';

export const ${agent.id.toUpperCase()}_CONFIG = {
  id: '${agent.id}',
  name: '${agent.name}',
  model: '${agent.model}',
  temperature: ${agent.model.includes('pro') ? 0.2 : 0.7},
  systemInstruction: ${agent.id.toUpperCase()}_PROMPT,
  responseSchema: ${agent.id.toUpperCase()}_SCHEMA
};
`);

  // 4. Execution Logic File
  fs.writeFileSync(path.join(agentDir, 'execution.ts'), `
import { adk } from '../../adk/core';
import { ${agent.id.toUpperCase()}_CONFIG } from './config';

export class ${agent.name.replace(/[^a-zA-Z]/g, '')}Executor {
  constructor() {
    adk.registerAgent(${agent.id.toUpperCase()}_CONFIG);
  }

  async execute(context: any) {
    return await adk.executeAgent('${agent.id}', "Analyze current context.", context);
  }

  async *stream(context: any) {
    const stream = adk.streamAgent('${agent.id}', "Stream reasoning.", context);
    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
`);
});

console.log('Successfully generated true separated multi-agent architecture.');
