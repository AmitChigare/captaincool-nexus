
import { adk } from '../../adk/core';
import { COMMENTATOR_CONFIG } from './config';

export class CommentaryNarratorExecutor {
  constructor() {
    adk.registerAgent(COMMENTATOR_CONFIG);
  }

  async execute(context: any) {
    return await adk.executeAgent('commentator', "Analyze current context.", context);
  }

  async *stream(context: any) {
    const stream = adk.streamAgent('commentator', "Stream reasoning.", context);
    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
