
import { adk } from '../../adk/core';
import { DEVILS_ADVOCATE_CONFIG } from './config';

export class DevilsAdvocateExecutor {
  constructor() {
    adk.registerAgent(DEVILS_ADVOCATE_CONFIG);
  }

  async execute(context: any) {
    return await adk.executeAgent('devils_advocate', "Analyze current context.", context);
  }

  async *stream(context: any) {
    const stream = adk.streamAgent('devils_advocate', "Stream reasoning.", context);
    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
