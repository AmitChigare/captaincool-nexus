import { create } from 'zustand';

export interface TelemetryLog {
  agent: string;
  event: string;
  message: string;
  timestamp: string;
}

export interface TacticalBranch {
  id: string;
  name: string;
  confidence: number;
  status: 'active' | 'pruned' | 'consensus';
  reasoning: string;
  rebuttals: string[];
}

export interface AgentInfluence {
  name: string;
  weight: number; // 0-100
  trend: 'up' | 'down' | 'flat';
}

export interface NexusState {
  orchestrationStatus: 'Idle' | 'Active' | 'Debating' | 'Synthesizing' | 'Tool Execution';
  currentRound: number;
  activeAgents: { id: string; name: string; status: string; load: number }[];
  matchContext: {
    battingTeam: string;
    bowlingTeam: string;
    score: string;
    overs: string;
    winProbability: number;
    latency: number;
  };
  debateStream: { agentName: string; message: string; timestamp: string; color: string; round: number }[];
  primaryDirective: {
    title: string;
    description: string;
    successProb: number;
    riskLevel: string;
    whyThis: string;
    whyNotThat: string;
  };
  
  // Advanced Telemetry & Debate Tracking
  telemetryLogs: TelemetryLog[];
  metrics: {
    latency: number;
    tokenUsage: number;
    memoryRetrievalCount: number;
    tacticalVolatility: number; // 0-100 index
  };
  activeTool: string | null;
  tacticalBranches: TacticalBranch[];
  agentInfluence: AgentInfluence[];
  rejectedStrategies: { strategy: string; reason: string }[];
  consensusHistory: { timestamp: string; value: number }[];

  // Actions
  setOrchestrationStatus: (status: NexusState['orchestrationStatus']) => void;
  updateAgentLoad: (id: string, load: number) => void;
  addDebateMessage: (msg: NexusState['debateStream'][0]) => void;
  updateDirective: (directive: NexusState['primaryDirective']) => void;
  logTelemetry: (log: Omit<TelemetryLog, 'timestamp'>) => void;
  updateTelemetryMetrics: (metrics: Partial<NexusState['metrics']>) => void;
  setActiveTool: (tool: string | null) => void;
  advanceRound: (round: number) => void;
}

export const useNexusStore = create<NexusState>((set) => ({
  orchestrationStatus: 'Debating',
  currentRound: 4,
  activeAgents: [
    { id: 'strategist', name: 'Match Strategist', status: 'Idle', load: 12 },
    { id: 'stats', name: 'Stat Intelligence', status: 'Validating', load: 68 },
    { id: 'pitch', name: 'Conditions Analyst', status: 'Active', load: 85 },
    { id: 'psych', name: 'Momentum Psych', status: 'Idle', load: 5 },
    { id: 'devil', name: 'Devil\'s Advocate', status: 'Attacking', load: 94 },
    { id: 'captain', name: 'Captain Persona', status: 'Synthesizing', load: 72 },
    { id: 'sim', name: 'Tactical Simulator', status: 'Projecting', load: 98 }
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
    { round: 1, agentName: 'Match Strategist', message: 'Recommend deep backward square. Starc to bowl short to Pant.', timestamp: '15:23:01', color: 'bg-chart-1' },
    { round: 2, agentName: 'Conditions Analyst', message: 'Dew coefficient is 0.75. Short balls will skid. 42% risk of flying off edge for six.', timestamp: '15:23:02', color: 'bg-chart-3' },
    { round: 2, agentName: 'Stat Intelligence', message: 'Pant strikes at 182 vs skiddy short balls here.', timestamp: '15:23:03', color: 'bg-chart-4' },
    { round: 3, agentName: 'Devil\'s Advocate', message: 'CRITICAL FLAW: If we bowl full instead, Pant\'s sweep covers the entire leg side. We are trapped by the dew.', timestamp: '15:23:04', color: 'bg-chart-5' },
    { round: 4, agentName: 'Captain Persona', message: 'Ignore the trap. Wide yorkers, stack off-side. Force him to slice over point.', timestamp: '15:23:05', color: 'bg-primary' }
  ],
  primaryDirective: {
    title: 'Execution Protocol Alpha',
    description: 'Wide Yorker (6th stump). Stack Off-Side.',
    successProb: 88.4,
    riskLevel: 'Moderate',
    whyThis: 'Forces Pant to reach away from his body, negating the leg-side sweep strength while avoiding the skiddy bounce hazard.',
    whyNotThat: 'Bowling short (original plan) has a 42% edge-for-six risk due to dew. Full straight balls are vulnerable to the sweep.'
  },

  telemetryLogs: [
    { agent: 'Simulator', event: 'FUTURE_BRANCH_PRUNED', message: 'Short ball tactic pruned due to 42% failure rate.', timestamp: new Date().toISOString() }
  ],
  metrics: {
    latency: 86,
    tokenUsage: 45210,
    memoryRetrievalCount: 114,
    tacticalVolatility: 88 // High volatility
  },
  activeTool: 'simulateAlternateFutures()',
  
  tacticalBranches: [
    { id: 'b1', name: 'Short Body', confidence: 15, status: 'pruned', reasoning: 'Skiddy bounce due to dew.', rebuttals: ['Pant SR 182'] },
    { id: 'b2', name: 'Full Straight', confidence: 32, status: 'pruned', reasoning: 'Vulnerable to sweep.', rebuttals: ['Devil: Leg side exposed'] },
    { id: 'b3', name: 'Wide Yorker', confidence: 88, status: 'consensus', reasoning: 'Forces weak slice.', rebuttals: [] }
  ],

  agentInfluence: [
    { name: 'Strategist', weight: 12, trend: 'down' },
    { name: 'Stats', weight: 45, trend: 'up' },
    { name: 'Pitch', weight: 68, trend: 'up' },
    { name: 'Devil', weight: 92, trend: 'up' },
    { name: 'Captain', weight: 100, trend: 'flat' }
  ],

  rejectedStrategies: [
    { strategy: "Pre-meditate sweep counter", reason: "Devil's Advocate: Leaves off-stump completely exposed." },
    { strategy: "Short ball attack", reason: "Pitch Analyst: Dew factor causes skidding. Pant SR 182." }
  ],
  consensusHistory: [
    { timestamp: 'R1', value: 35 },
    { timestamp: 'R2', value: 20 },
    { timestamp: 'R3', value: 12 },
    { timestamp: 'R4', value: 65 },
    { timestamp: 'R5', value: 88 }
  ],

  setOrchestrationStatus: (status) => set({ orchestrationStatus: status }),
  updateAgentLoad: (id, load) => set((state) => ({
    activeAgents: state.activeAgents.map(a => a.id === id ? { ...a, load } : a)
  })),
  addDebateMessage: (msg) => set((state) => ({
    debateStream: [...state.debateStream, msg]
  })),
  updateDirective: (directive) => set({ primaryDirective: directive }),
  
  logTelemetry: (log) => set((state) => ({
    telemetryLogs: [{ ...log, timestamp: new Date().toISOString() }, ...state.telemetryLogs].slice(0, 50)
  })),
  updateTelemetryMetrics: (metrics) => set((state) => ({
    metrics: { ...state.metrics, ...metrics }
  })),
  setActiveTool: (tool) => set({ activeTool: tool }),
  advanceRound: (round) => set({ currentRound: round })
}));
