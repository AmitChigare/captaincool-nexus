import { adk } from '../adk/core';
import { MatchStrategistExecutor } from '../agents/strategist/execution';
import { StatisticalIntelligenceAgentExecutor } from '../agents/statistics/execution';
import { PitchConditionsAnalystExecutor } from '../agents/pitch/execution';
import { MomentumPsychologistExecutor } from '../agents/psychologist/execution';
import { DevilsAdvocateExecutor } from '../agents/devils_advocate/execution';
import { CaptainPersonaEngineExecutor } from '../agents/captain/execution';
import { TacticalSimulatorExecutor } from '../agents/simulator/execution';

export class ConsensusEngine {
  async synthesize(context: any) {
    return await adk.executeAgent('captain', "Final synthesis across all 5 rounds.", context);
  }
}

export class OrchestrationEngine {
  private strategist = new MatchStrategistExecutor();
  private stats = new StatisticalIntelligenceAgentExecutor();
  private pitch = new PitchConditionsAnalystExecutor();
  private psych = new MomentumPsychologistExecutor();
  private devil = new DevilsAdvocateExecutor();
  private captain = new CaptainPersonaEngineExecutor();
  private sim = new TacticalSimulatorExecutor();
  private consensus = new ConsensusEngine();

  async executePipeline(context: any) {
    console.log('[Orchestrator] Starting 6-Round Multi-Agent Tactical Debate Pipeline...');
    
    // ROUND 1: Base Strategy
    console.log('[Orchestrator] Round 1: Strategist Proposal');
    const stratRes = await this.strategist.execute(context);

    // ROUND 2: Validation & Context (Parallel)
    console.log('[Orchestrator] Round 2: Environmental & Statistical Validation');
    const [statsRes, pitchRes, psychRes] = await Promise.all([
      this.stats.execute({ ...context, proposal: stratRes }),
      this.pitch.execute({ ...context, proposal: stratRes }),
      this.psych.execute({ ...context, proposal: stratRes })
    ]);

    const debateState = { strategist: stratRes, statistics: statsRes, pitch: pitchRes, psychologist: psychRes };

    // ROUND 3: Devil's Advocate
    console.log('[Orchestrator] Round 3: Aggressive Challenge & Rebuttal');
    const devilChallenge = await this.devil.execute({ ...context, currentDebate: debateState });

    // ROUND 4: Captain Persona Moderation
    console.log('[Orchestrator] Round 4: Captain Persona Modification (Dhoni/Kohli Models)');
    const captainModification = await this.captain.execute({ ...context, critique: devilChallenge, base: debateState });

    // ROUND 5: Tactical Simulator
    console.log('[Orchestrator] Round 5: Simulating Alternate Futures');
    const simResults = await this.sim.execute({ ...context, modifiedStrategy: captainModification });
    
    // ROUND 6: Final Consensus Synthesis
    console.log('[Orchestrator] Round 6: Synthesis & Convergence');
    const finalDecision = await this.consensus.synthesize({
      matchContext: context,
      debate: debateState,
      critique: devilChallenge,
      captain: captainModification,
      simulations: simResults
    });

    return finalDecision;
  }
}

export const orchestrator = new OrchestrationEngine();
