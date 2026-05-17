
import { adk } from '../../adk/core';
import { STRATEGIST_CONFIG } from './config';

export class MatchStrategistExecutor {
  constructor() {
    adk.registerAgent(STRATEGIST_CONFIG);
  }

  async execute(context: any) {
    return await adk.executeAgent('strategist', "Analyze current context.", context);
  }

  async *stream(context: any) {
    const stream = adk.streamAgent('strategist', "Stream reasoning.", context);
    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
