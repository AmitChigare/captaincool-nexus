import { create } from 'zustand';

export interface NexusState {
  orchestrationStatus: 'Idle' | 'Active' | 'Debating' | 'Synthesizing';
  activeAgents: { id: string; name: string; status: string; load: number }[];
  matchContext: {
    battingTeam: string;
    bowlingTeam: string;
    score: string;
    overs: string;
    winProbability: number;
    latency: number;
  };
  debateStream: { agentName: string; message: string; timestamp: string; color: string }[];
  primaryDirective: {
    title: string;
    description: string;
    successProb: number;
    riskLevel: string;
  };
  
  // Actions
  setOrchestrationStatus: (status: NexusState['orchestrationStatus']) => void;
  updateAgentLoad: (id: string, load: number) => void;
  addDebateMessage: (msg: NexusState['debateStream'][0]) => void;
  updateDirective: (directive: NexusState['primaryDirective']) => void;
}

export const useNexusStore = create<NexusState>((set) => ({
  orchestrationStatus: 'Active',
  activeAgents: [
    { id: 'multimodal', name: 'Multimodal ADK', status: 'Active', load: 92 },
    { id: 'sim', name: 'Simulations Engine', status: 'Idle', load: 45 },
    { id: 'memory', name: 'Long-Context Memory', status: 'Indexing', load: 12 },
    { id: 'tools', name: 'Tool Execution', status: 'Calling', load: 78 }
  ],
  matchContext: {
    battingTeam: 'IND',
    bowlingTeam: 'AUS',
    score: '184/4',
    overs: '15.2',
    winProbability: 84.2,
    latency: 12
  },
  debateStream: [
    { agentName: 'Match Strategist', message: 'Recommending aggressive sweep. Pitch deterioration on off-stump makes straight hitting risky.', timestamp: '15:23:01', color: 'bg-chart-1' },
    { agentName: 'Devil\'s Advocate', message: 'Objection. Telemetry shows Starc\'s off-cutter bounces 12% higher here. Sweep carries 68% top-edge risk.', timestamp: '15:23:02', color: 'bg-chart-2' },
    { agentName: 'Captain Persona', message: 'Overriding Tactical. Data Engine is correct. Hold depth, wait for the ball, play straight. Consensus reached.', timestamp: '15:23:05', color: 'bg-primary' }
  ],
  primaryDirective: {
    title: 'Execution Protocol Alpha',
    description: 'Hold Crease Depth. Target Straight.',
    successProb: 85.4,
    riskLevel: 'Moderate'
  },

  setOrchestrationStatus: (status) => set({ orchestrationStatus: status }),
  updateAgentLoad: (id, load) => set((state) => ({
    activeAgents: state.activeAgents.map(a => a.id === id ? { ...a, load } : a)
  })),
  addDebateMessage: (msg) => set((state) => ({
    debateStream: [...state.debateStream, msg]
  })),
  updateDirective: (directive) => set({ primaryDirective: directive })
}));
