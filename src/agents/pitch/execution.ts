
import { adk } from '../../adk/core';
import { PITCH_CONFIG } from './config';

export class PitchConditionsAnalystExecutor {
  constructor() {
    adk.registerAgent(PITCH_CONFIG);
  }

  async execute(context: any) {
    return await adk.executeAgent('pitch', "Analyze current context.", context);
  }

  async *stream(context: any) {
    const stream = adk.streamAgent('pitch', "Stream reasoning.", context);
    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
