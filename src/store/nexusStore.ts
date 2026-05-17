import { create } from 'zustand';

export interface NexusState {
  currentView: 'war_room' | 'multiverse' | 'observability';
  matchContext: {
    battingTeam: string;
    bowlingTeam: string;
    score: string;
    overs: string;
    winProbability: number;
    latency: number;
  };
  
  // Base State
  primaryDirective: {
    description: string;
    successProb: number;
    riskLevel: string;
    whyThis: string;
    whyNotThat: string;
    rationale: string;
  };
  
  // Multiverse State
  alternateFutures: {
    id: string;
    scenario: string;
    winProbDelta: number;
    collapseProb: number;
    description: string;
  }[];
  
  // Observability State
  telemetryMetrics: {
    activeModel: string;
    orchestrationCycleId: string;
    throughput: string;
    convergenceRate: string;
    tokenUsage: number;
  };
  orchestrationNodes: { id: string; name: string; status: string; load: number }[];
  
  // Voice Commentary
  commentaryStream: {
    text: string;
    urgency: 'low' | 'medium' | 'high';
    isSpeaking: boolean;
  };
  
  // Explainability Matrix
  tradeoffMatrix: {
    strategy: string;
    pros: string[];
    cons: string[];
    risk: number;
  }[];

  // Actions
  setView: (view: NexusState['currentView']) => void;
}

export const useNexusStore = create<NexusState>((set) => ({
  currentView: 'war_room',
  matchContext: {
    battingTeam: 'IND',
    bowlingTeam: 'AUS',
    score: '184/4',
    overs: '15.2',
    winProbability: 84.2,
    latency: 12
  },
  
  primaryDirective: {
    description: 'Wide Yorker (6th stump). Stack Off-Side.',
    successProb: 88.4,
    riskLevel: 'Moderate',
    whyThis: 'Forces Pant to reach away, negating leg-side sweep strength.',
    whyNotThat: 'Short ball has 42% edge-for-six risk due to dew.',
    rationale: 'Captain Persona (Dhoni) overrides stat engine based on high-pressure game context.'
  },

  alternateFutures: [
    { id: 'f1', scenario: 'Aggressive Bouncer Attack', winProbDelta: -12.4, collapseProb: 18, description: 'Pant hooks for six. High volatility. Pruned.' },
    { id: 'f2', scenario: 'Spin Introduction (Jadeja)', winProbDelta: -22.1, collapseProb: 4, description: 'Dew factor 0.75 nullifies spin. High boundary risk.' },
    { id: 'f3', scenario: 'Defensive Wide Line', winProbDelta: +4.2, collapseProb: 8, description: 'Limits boundaries but allows rotation. Low risk.' }
  ],

  telemetryMetrics: {
    activeModel: 'gemini-2.5-pro-vision',
    orchestrationCycleId: 'CYC_9942_A',
    throughput: '420 tok/sec',
    convergenceRate: '92% / 6 rounds',
    tokenUsage: 142050
  },

  orchestrationNodes: [
    { id: 'node_strat', name: 'Match Strategist', status: 'Sync', load: 12 },
    { id: 'node_stat', name: 'Stat Intelligence', status: 'Fetching', load: 88 },
    { id: 'node_pitch', name: 'Conditions Analyst', status: 'Sync', load: 45 },
    { id: 'node_sim', name: 'Monte Carlo Sim', status: 'Projecting', load: 95 }
  ],

  commentaryStream: {
    text: "Starc at the top of his mark. The Nexus Engine is flashing a massive warning on the short ball. Dhoni's persona has completely overridden the stats—he wants it full and wide!",
    urgency: 'high',
    isSpeaking: true
  },

  tradeoffMatrix: [
    { strategy: 'Wide Yorker', pros: ['Negates Sweep', 'Low Boundary Risk'], cons: ['Wide Risk', 'Requires Elite Execution'], risk: 45 },
    { strategy: 'Short Body', pros: ['Surprise Factor', 'Possible Top Edge'], cons: ['Skidding due to dew', 'Pant SR 182'], risk: 85 }
  ],

  setView: (view) => set({ currentView: view })
}));
