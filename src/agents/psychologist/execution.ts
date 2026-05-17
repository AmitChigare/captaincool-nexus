
import { adk } from '../../adk/core';
import { PSYCHOLOGIST_CONFIG } from './config';

export class MomentumPsychologistExecutor {
  constructor() {
    adk.registerAgent(PSYCHOLOGIST_CONFIG);
  }

  async execute(context: any) {
    return await adk.executeAgent('psychologist', "Analyze current context.", context);
  }

  async *stream(context: any) {
    const stream = adk.streamAgent('psychologist', "Stream reasoning.", context);
    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
