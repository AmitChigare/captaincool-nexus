import { adk } from '../adk/core';
import { MatchStrategistExecutor } from '../agents/strategist/execution';
import { StatisticalIntelligenceAgentExecutor } from '../agents/statistics/execution';
import { PitchConditionsAnalystExecutor } from '../agents/pitch/execution';
import { MomentumPsychologistExecutor } from '../agents/psychologist/execution';
import { DevilsAdvocateExecutor } from '../agents/devils_advocate/execution';
import { CaptainPersonaEngineExecutor } from '../agents/captain/execution';
import { TacticalSimulatorExecutor } from '../agents/simulator/execution';

export class OrchestrationEngine {
  private strategist = new MatchStrategistExecutor();
  private stats = new StatisticalIntelligenceAgentExecutor();
  private pitch = new PitchConditionsAnalystExecutor();
  private psych = new MomentumPsychologistExecutor();
  private devil = new DevilsAdvocateExecutor();
  private captain = new CaptainPersonaEngineExecutor();
  private sim = new TacticalSimulatorExecutor();

  async executePipeline(context: any) {
    console.log('[Orchestrator] Starting multi-agent execution pipeline...');
    
    // 1. Parallel execution (Flash Agents)
    const [stratRes, statsRes, pitchRes, psychRes] = await Promise.all([
      this.strategist.execute(context),
      this.stats.execute(context),
      this.pitch.execute(context),
      this.psych.execute(context)
    ]);

    const debateState = {
      strategist: stratRes,
      statistics: statsRes,
      pitch: pitchRes,
      psychologist: psychRes
    };

    // 2. Devil's Advocate challenges the initial findings
    const devilChallenge = await this.devil.execute({ ...context, currentDebate: debateState });

    // 3. Pro agents step in (Simulation & Captain)
    const simResults = await this.sim.execute({ ...context, challenge: devilChallenge });
    
    const finalDecision = await this.captain.execute({
      matchContext: context,
      debate: debateState,
      critique: devilChallenge,
      simulations: simResults
    });

    return finalDecision;
  }
}

export const orchestrator = new OrchestrationEngine();
