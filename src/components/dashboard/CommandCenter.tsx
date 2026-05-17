"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexusStore } from '@/store/nexusStore';
import { 
  Activity, Shield, Cpu, Zap, Wifi, Eye, 
  BrainCircuit, Crosshair, Radar, Trophy, 
  BarChart4, Clock, Network, MessageSquare,
  AlertTriangle, Fingerprint, Database, XOctagon, LineChart, Target, Flame, GitMerge
} from 'lucide-react';

export default function CommandCenter() {
  const [mounted, setMounted] = useState(false);
  const state = useNexusStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden text-foreground font-mono text-[9px] md:text-[11px]">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/90 via-background/60 to-background/95 pointer-events-none z-0" />

      {/* TOP: Live Match Ribbon */}
      <header className="h-12 shrink-0 border-b border-primary/20 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 z-10 shadow-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-destructive font-bold uppercase tracking-widest text-[7px] leading-none">6-Round Orchestrator</span>
              <span className="text-primary font-bold uppercase tracking-widest text-sm leading-tight">NEXUS PRIME</span>
            </div>
          </div>
          <div className="h-6 w-px bg-border/50 mx-2" />
          <div className="flex gap-4 items-center bg-card/60 px-3 py-1 rounded-sm border border-primary/10 text-xs">
            <div className="font-bold tracking-widest flex items-baseline gap-2">
              <span className="text-muted-foreground text-[9px]">{state.matchContext.battingTeam}</span> {state.matchContext.score} <span className="text-muted-foreground font-normal text-[9px]">({state.matchContext.overs})</span>
            </div>
            <div className="text-muted-foreground text-[9px]">vs</div>
            <div className="font-bold tracking-widest flex items-baseline gap-2">
              <span className="text-muted-foreground text-[9px]">{state.matchContext.bowlingTeam}</span> 192/8 <span className="text-muted-foreground font-normal text-[9px]">(20.0)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[9px] text-muted-foreground tracking-widest uppercase">
          <div className="flex items-center gap-1"><Cpu className="w-3 h-3 text-primary" /> ADK Sync: {state.matchContext.latency}ms</div>
          <div className="flex items-center gap-1"><Flame className="w-3 h-3 text-chart-4" /> Volatility: {state.metrics.tacticalVolatility}</div>
          <div className="flex items-center gap-1 border border-primary/30 bg-primary/10 px-2 py-0.5 rounded text-primary">
            Round {state.currentRound}/6: Synthesis
          </div>
        </div>
      </header>

      {/* MAIN CONTENT MATRIX */}
      <div className="flex-1 flex overflow-hidden z-10 p-2 gap-2">
        
        {/* COL 1: Agent Registry & Influence */}
        <aside className="w-64 flex flex-col gap-2 shrink-0">
          <div className="flex-1 border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-3 flex flex-col">
            <h2 className="text-[9px] text-primary mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
              <Network className="w-3 h-3" /> Agent Influence & Load
            </h2>
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {state.activeAgents.map((sys, i) => {
                const influence = state.agentInfluence.find(a => a.name.includes(sys.name.split(" ")[0]));
                const infColor = influence?.trend === "up" ? "text-chart-2" : influence?.trend === "down" ? "text-chart-5" : "text-muted-foreground";
                return (
                  <div key={i} className="p-2 rounded border border-border/50 bg-background/50 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-full w-1 bg-primary/20" />
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-bold text-[9px] flex items-center gap-1">
                        {sys.name}
                      </div>
                      <div className="text-[7px] text-primary uppercase">{sys.status}</div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      <div className="w-24">
                        <div className="text-[7px] text-muted-foreground mb-0.5">CPU Load</div>
                        <div className="h-1 w-full bg-secondary rounded overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${sys.load}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[7px] text-muted-foreground">Influence Weight</div>
                        <div className={`font-bold ${infColor}`}>{influence?.weight || 0}/100</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* COL 2: Tactical Evolution Engine (Why This Over That) */}
        <main className="flex-[2] flex flex-col gap-2">
          
          <div className="h-44 border border-chart-2/40 bg-black/60 backdrop-blur-xl rounded-lg p-4 flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.03)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-chart-2 to-transparent opacity-50" />
            
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[11px] text-chart-2 flex items-center gap-2 uppercase tracking-widest font-bold">
                <Target className="w-4 h-4 animate-pulse" /> Captain's Execution Protocol
              </h2>
            </div>
            
            <div className="flex gap-4 h-full">
               <div className="flex-1 flex flex-col justify-center">
                  <div className="text-2xl font-bold tracking-wide text-foreground leading-tight">{state.primaryDirective.description}</div>
                  <div className="flex gap-4 mt-3">
                    <div className="px-3 py-1 bg-chart-2/10 border border-chart-2/30 rounded text-chart-2 font-bold flex items-center gap-2">
                      Win Prob: {state.primaryDirective.successProb}%
                    </div>
                    <div className="px-3 py-1 bg-chart-4/10 border border-chart-4/30 rounded text-chart-4 font-bold">
                      Risk: {state.primaryDirective.riskLevel}
                    </div>
                  </div>
               </div>
               
               <div className="w-72 flex flex-col gap-2">
                 <div className="bg-chart-2/5 border border-chart-2/20 p-2 rounded">
                   <div className="text-[8px] text-chart-2 uppercase font-bold mb-0.5">Why This?</div>
                   <div className="text-[9px] text-foreground/90">{state.primaryDirective.whyThis}</div>
                 </div>
                 <div className="bg-chart-5/5 border border-chart-5/20 p-2 rounded">
                   <div className="text-[8px] text-chart-5 uppercase font-bold mb-0.5">Why NOT Original Strategy?</div>
                   <div className="text-[9px] text-foreground/90">{state.primaryDirective.whyNotThat}</div>
                 </div>
               </div>
            </div>
          </div>

          {/* Tactical Branch Tree & Consensus Evolution */}
          <div className="flex-1 flex gap-2">
            <div className="flex-[1.5] border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-3 flex flex-col">
              <h2 className="text-[9px] text-primary mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
                <GitMerge className="w-3 h-3" /> Tactical Branch Tree (Pruning)
              </h2>
              <div className="flex-1 flex flex-col gap-2">
                {state.tacticalBranches.map((branch, i) => (
                  <div key={i} className={`p-2 rounded border flex gap-3 ${branch.status === 'consensus' ? 'bg-chart-2/10 border-chart-2/50' : 'bg-black/50 border-chart-5/30 opacity-70'}`}>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                         <span className={`font-bold ${branch.status === 'consensus' ? 'text-chart-2' : 'text-muted-foreground line-through'}`}>{branch.name}</span>
                         <span className="text-[8px] bg-background px-1.5 py-0.5 rounded border border-border">Conf: {branch.confidence}%</span>
                      </div>
                      <div className="text-[9px] text-foreground/70">{branch.reasoning}</div>
                    </div>
                    {branch.status === 'pruned' && (
                      <div className="w-32 border-l border-chart-5/50 pl-2">
                        <div className="text-[7px] text-chart-5 uppercase">Pruned By</div>
                        <div className="text-[8px] text-chart-5/80 truncate mt-0.5">{branch.rebuttals[0]}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-3 flex flex-col">
              <h2 className="text-[9px] text-primary mb-2 flex items-center gap-2 uppercase tracking-widest font-bold">
                <LineChart className="w-3 h-3" /> Consensus Convergence
              </h2>
              <div className="flex-1 flex items-end justify-between px-2 gap-2 pb-1 border-b border-l border-border/50 pt-6">
                {state.consensusHistory.map((pt, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 w-full relative group h-full justify-end">
                    <motion.div 
                      className="w-full bg-chart-1/50 rounded-t hover:bg-chart-1 transition-colors relative"
                      initial={{ height: 0 }}
                      animate={{ height: `${pt.value}%` }}
                    >
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] text-primary">{pt.value}%</div>
                    </motion.div>
                    <span className="text-[7px] text-muted-foreground absolute -bottom-4">{pt.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* COL 3: 6-Round Debate Stream */}
        <aside className="w-80 flex flex-col gap-2 shrink-0">
          <div className="flex-1 border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-3 flex flex-col">
            <h2 className="text-[9px] text-primary mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
              <MessageSquare className="w-3 h-3" /> Live 6-Round Debate
            </h2>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-none">
              {state.debateStream.map((msg, i) => (
                <div key={i} className={`p-2 rounded border relative ${msg.agentName === 'Captain Persona' ? 'bg-primary/10 border-primary/30 shadow-[0_0_10px_rgba(0,255,255,0.1)]' : 'bg-background/60 border-border/30'}`}>
                  <div className="text-[7px] text-muted-foreground absolute top-1 right-2">Round {msg.round}</div>
                  <div className={`text-[8px] font-bold mb-0.5 uppercase tracking-wider ${msg.color.replace('bg-', 'text-')}`}>
                    {msg.agentName}
                  </div>
                  <div className={`text-[10px] leading-relaxed ${msg.agentName === 'Captain Persona' ? 'font-semibold text-foreground' : 'text-foreground/80'}`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-32 border border-chart-5/30 bg-black/60 backdrop-blur-md rounded-lg p-3 flex flex-col overflow-hidden">
            <h2 className="text-[9px] text-chart-5 mb-2 flex items-center gap-2 uppercase tracking-widest font-bold">
              <XOctagon className="w-3 h-3" /> Devil's Advocate Rejections
            </h2>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {state.rejectedStrategies.map((strat, i) => (
                <div key={i} className="border-l-2 border-chart-5 pl-2">
                  <div className="text-[9px] text-muted-foreground line-through">{strat.strategy}</div>
                  <div className="text-[8px] text-chart-5/80 mt-0.5">{strat.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
}
