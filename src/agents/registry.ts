import { adk } from '../adk/core';
import { Prompts } from '../prompts/agents';
import { AgentSchemas } from '../types/schemas';

export function initializeAgents() {
  // Debate Agents (Fast - Gemini 1.5 Flash / 2.5 Flash)
  const debateAgents = [
    { id: 'strategist', name: 'Match Strategist', role: 'Tactics' },
    { id: 'statistics', name: 'Statistical Intelligence', role: 'Data' },
    { id: 'pitch', name: 'Conditions Analyst', role: 'Environment' },
    { id: 'psychologist', name: 'Momentum Psychologist', role: 'Psychology' },
    { id: 'devils_advocate', name: 'Devil\'s Advocate', role: 'Challenger' },
    { id: 'simulator', name: 'Tactical Simulator', role: 'Predictive' }
  ];

  debateAgents.forEach(agent => {
    adk.registerAgent({
      id: agent.id,
      name: agent.name,
      model: 'gemini-2.5-flash',
      role: agent.role,
      systemInstruction: Prompts[agent.id as keyof typeof Prompts],
      temperature: 0.7,
      responseSchema: AgentSchemas.DebateContribution
    });
  });

  // Consensus & Deep Reasoning Agents (Pro)
  adk.registerAgent({
    id: 'captain',
    name: 'Captain Persona',
    model: 'gemini-2.5-pro',
    role: 'Decision Engine',
    systemInstruction: Prompts.captain,
    temperature: 0.2,
    responseSchema: AgentSchemas.CaptainDecision
  });

  adk.registerAgent({
    id: 'commentator',
    name: 'Elite Narrator',
    model: 'gemini-2.5-flash',
    role: 'Narrative',
    systemInstruction: Prompts.commentator,
    temperature: 0.9,
  });

  console.log('[Registry] All ADK Agents Initialized Successfully.');
}
