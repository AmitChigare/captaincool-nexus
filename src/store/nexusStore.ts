import { create } from 'zustand';

export interface FieldPosition {
  id: string;
  name: string;
  x: number; // 0 to 100 (percentage of field)
  y: number; // 0 to 100
  role: 'catcher' | 'boundary' | 'inner_ring' | 'bowler' | 'keeper';
}

export interface CaptainProfile {
  id: string;
  name: string;
  traits: {
    aggression: number;
    manipulation: number;
    pacing: number;
    riskAppetite: number;
    intuition: number;
  };
  dna: string;
  description: string;
}

export interface NexusState {
  currentView: 'war_room' | 'multiverse' | 'field_cognition' | 'observability';
  matchContext: { battingTeam: string; bowlingTeam: string; score: string; overs: string; winProbability: number; latency: number; };
  
  // Base State
  primaryDirective: { description: string; successProb: number; riskLevel: string; whyThis: string; whyNotThat: string; rationale: string; };
  
  // Multiverse State
  alternateFutures: { id: string; scenario: string; winProbDelta: number; collapseProb: number; description: string; }[];
  
  // Observability State
  telemetryMetrics: { activeModel: string; orchestrationCycleId: string; throughput: string; convergenceRate: string; tokenUsage: number; };
  orchestrationNodes: { id: string; name: string; status: string; load: number; isStreaming?: boolean }[];
  
  // Voice Commentary
  commentaryStream: { text: string; urgency: 'low' | 'medium' | 'high'; isSpeaking: boolean; };
  
  // Explainability Matrix
  tradeoffMatrix: { strategy: string; pros: string[]; cons: string[]; risk: number; }[];

  // Field Visualization
  fieldSetup: FieldPosition[];
  heatMapZones: { x: number; y: number; intensity: number; type: 'danger' | 'scoring' }[];

  // Captain Cognition
  activeCaptain: CaptainProfile;

  // Live Debate Stream with typing simulation
  debateStream: { id: string; agentName: string; text: string; round: number; color: string; isTyping: boolean }[];

  // Actions
  setView: (view: NexusState['currentView']) => void;
  updateTypingState: (id: string, text: string, isTyping: boolean) => void;
}

export const useNexusStore = create<NexusState>((set) => ({
  currentView: 'war_room',
  matchContext: { battingTeam: 'IND', bowlingTeam: 'AUS', score: '184/4', overs: '15.2', winProbability: 84.2, latency: 12 },
  
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

  telemetryMetrics: { activeModel: 'gemini-2.5-pro-vision', orchestrationCycleId: 'CYC_9942_A', throughput: '420 tok/sec', convergenceRate: '92% / 6 rounds', tokenUsage: 142050 },

  orchestrationNodes: [
    { id: 'node_strat', name: 'Match Strategist', status: 'Sync', load: 12 },
    { id: 'node_stat', name: 'Stat Intelligence', status: 'Fetching', load: 88, isStreaming: true },
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

  // Field Data
  fieldSetup: [
    { id: 'keeper', name: 'WK', x: 50, y: 15, role: 'keeper' },
    { id: 'bowler', name: 'B', x: 50, y: 85, role: 'bowler' },
    { id: 'slip1', name: '1st Slip', x: 42, y: 18, role: 'catcher' },
    { id: 'point', name: 'Point', x: 15, y: 40, role: 'inner_ring' },
    { id: 'cover', name: 'Deep Cover', x: 5, y: 65, role: 'boundary' },
    { id: 'mid_off', name: 'Mid Off', x: 35, y: 75, role: 'inner_ring' },
    { id: 'mid_on', name: 'Mid On', x: 65, y: 75, role: 'inner_ring' },
    { id: 'square_leg', name: 'Deep Sq Leg', x: 95, y: 35, role: 'boundary' },
    { id: 'mid_wicket', name: 'Mid Wicket', x: 80, y: 55, role: 'inner_ring' },
    { id: 'third_man', name: 'Third Man', x: 25, y: 5, role: 'boundary' },
    { id: 'fine_leg', name: 'Fine Leg', x: 75, y: 5, role: 'inner_ring' }
  ],
  heatMapZones: [
    { x: 20, y: 70, intensity: 80, type: 'danger' }, // Wide off-side danger
    { x: 90, y: 40, intensity: 65, type: 'scoring' } // Deep square leg scoring
  ],

  // Captain Cognition Data
  activeCaptain: {
    id: 'dhoni',
    name: 'MS Dhoni',
    traits: { aggression: 40, manipulation: 95, pacing: 90, riskAppetite: 60, intuition: 100 },
    dna: 'Trap-Based | Delayed Aggression | Late-Over Optimization',
    description: 'Relies on strangling boundaries and manipulating the batter into forcing false shots. Extensively relies on intuition over raw statistics in high-pressure death overs.'
  },

  debateStream: [
    { id: 'd1', round: 1, agentName: 'Match Strategist', text: 'Recommend deep backward square. Starc to bowl short to Pant.', timestamp: '15:23:01', color: 'bg-chart-1', isTyping: false },
    { id: 'd2', round: 2, agentName: 'Devil\'s Advocate', text: 'CRITICAL FLAW: Dew coefficient is 0.75. Short balls will skid.', timestamp: '15:23:02', color: 'bg-chart-5', isTyping: false },
    { id: 'd3', round: 3, agentName: 'Captain Persona', text: 'Synthesizing...', timestamp: '15:23:03', color: 'bg-primary', isTyping: true }
  ],

  setView: (view) => set({ currentView: view }),
  updateTypingState: (id, text, isTyping) => set((state) => ({
    debateStream: state.debateStream.map(msg => msg.id === id ? { ...msg, text, isTyping } : msg)
  }))
}));
