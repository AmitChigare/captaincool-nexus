
import { adk } from '../../adk/core';
import { STATISTICS_CONFIG } from './config';

export class StatisticalIntelligenceAgentExecutor {
  constructor() {
    adk.registerAgent(STATISTICS_CONFIG);
  }

  async execute(context: any) {
    return await adk.executeAgent('statistics', "Analyze current context.", context);
  }

  async *stream(context: any) {
    const stream = adk.streamAgent('statistics', "Stream reasoning.", context);
    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
