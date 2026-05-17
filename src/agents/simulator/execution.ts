
import { adk } from '../../adk/core';
import { SIMULATOR_CONFIG } from './config';

export class TacticalSimulatorExecutor {
  constructor() {
    adk.registerAgent(SIMULATOR_CONFIG);
  }

  async execute(context: any) {
    return await adk.executeAgent('simulator', "Analyze current context.", context);
  }

  async *stream(context: any) {
    const stream = adk.streamAgent('simulator', "Stream reasoning.", context);
    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
