
import { adk } from '../../adk/core';
import { CAPTAIN_CONFIG } from './config';

export class CaptainPersonaEngineExecutor {
  constructor() {
    adk.registerAgent(CAPTAIN_CONFIG);
  }

  async execute(context: any) {
    return await adk.executeAgent('captain', "Analyze current context.", context);
  }

  async *stream(context: any) {
    const stream = adk.streamAgent('captain', "Stream reasoning.", context);
    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
