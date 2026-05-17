export interface MemoryNode {
  id: string;
  type: 'tactical_failure' | 'tactical_success' | 'momentum_shift' | 'pressure_spike' | 'captain_tendency';
  content: string;
  contextOver: number;
  importanceScore: number;
  embeddingVector?: number[]; // Mock vector
}

export class VectorMemoryLayer {
  private memoryStore: MemoryNode[] = [];

  constructor() {
    // Pre-seed some historical memories for the debate to reference
    this.storeMemory({
      type: 'tactical_failure',
      content: 'The slower bouncer failed against Pant in over 14. Resulted in a 16-run over.',
      contextOver: 14,
      importanceScore: 0.92
    });
    this.storeMemory({
      type: 'pressure_spike',
      content: 'Pressure index spiked by 24% after consecutive boundaries by Kohli.',
      contextOver: 12,
      importanceScore: 0.88
    });
    this.storeMemory({
      type: 'captain_tendency',
      content: 'Dhoni persona historically delays spinner reintroduction when dew factor is above 0.70.',
      contextOver: 10,
      importanceScore: 0.95
    });
  }

  storeMemory(node: Omit<MemoryNode, 'id'>) {
    const id = `mem_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    this.memoryStore.push({ ...node, id, embeddingVector: Array(128).fill(Math.random()) });
    console.log(`[MemoryLayer] Stored node ${id}: ${node.content.substring(0, 30)}...`);
  }

  retrieveContext(query: string, limit: number = 3): MemoryNode[] {
    console.log(`[MemoryLayer] Vector search for context: "${query}"`);
    // Simulated vector similarity ranking (returns top importance scores for now)
    return this.memoryStore
      .sort((a, b) => b.importanceScore - a.importanceScore)
      .slice(0, limit);
  }

  getInningsEvolution() {
    return this.memoryStore.sort((a, b) => a.contextOver - b.contextOver);
  }
}

export const memoryLayer = new VectorMemoryLayer();
