"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexusStore } from '@/store/nexusStore';
import { 
  Cpu, Target, Flame, GitMerge, LineChart, Network,
  Camera, Database, AlertCircle, Radio, Settings, Globe, Shield, Speaker, Volume2, BrainCircuit
} from 'lucide-react';

export default function CommandCenter() {
  const [mounted, setMounted] = useState(false);
  const state = useNexusStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen w-full bg-[#030508] overflow-hidden text-foreground font-mono text-[9px] md:text-[11px] selection:bg-primary/30">
      
      {/* CINEMATIC EFFECTS */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />
      
      {/* Holographic glowing orb behind center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* TOP: Live Match Ribbon */}
      <header className="h-14 shrink-0 border-b border-primary/20 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 z-10 shadow-[0_10px_30px_rgba(0,255,255,0.05)] relative">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-bold uppercase tracking-widest text-[13px] leading-tight flex items-center gap-2">
                <BrainCircuit className="w-4 h-4" /> NEXUS OS
              </span>
              <span className="text-muted-foreground font-bold uppercase tracking-widest text-[7px] leading-none">DeepMind Engine Active</span>
            </div>
          </div>
          
          <div className="h-6 w-px bg-border/50 mx-2" />
          
          <div className="flex bg-black/50 border border-primary/20 rounded p-1">
            <button 
              onClick={() => state.setView('war_room')}
              className={`px-4 py-1 rounded transition-colors ${state.currentView === 'war_room' ? 'bg-primary/20 text-primary font-bold shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'text-muted-foreground hover:text-primary'}`}
            >
              WAR ROOM
            </button>
            <button 
              onClick={() => state.setView('multiverse')}
              className={`px-4 py-1 rounded transition-colors ${state.currentView === 'multiverse' ? 'bg-primary/20 text-primary font-bold shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'text-muted-foreground hover:text-primary'}`}
            >
              MULTIVERSE ENGINE
            </button>
            <button 
              onClick={() => state.setView('observability')}
              className={`px-4 py-1 rounded transition-colors ${state.currentView === 'observability' ? 'bg-primary/20 text-primary font-bold shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'text-muted-foreground hover:text-primary'}`}
            >
              OBSERVABILITY
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[9px] text-muted-foreground tracking-widest uppercase">
          <div className="flex items-center gap-2 border border-chart-2/30 bg-chart-2/10 px-3 py-1.5 rounded text-chart-2 animate-pulse">
            <Radio className="w-3 h-3" /> Live Telemetry
          </div>
        </div>
      </header>

      {/* AI COMMENTARY BAR */}
      <div className="h-8 shrink-0 bg-primary/5 border-b border-primary/10 flex items-center px-6 gap-4 z-10">
        <div className="flex items-center gap-2 text-chart-2">
          <Volume2 className="w-4 h-4" />
          <span className="font-bold text-[10px] uppercase tracking-widest">AI Commentary Mode</span>
        </div>
        <div className="h-4 w-px bg-primary/20" />
        <div className="text-primary/90 text-[10px] italic flex-1 truncate">
          "{state.commentaryStream.text}"
        </div>
        {state.commentaryStream.isSpeaking && (
          <div className="flex gap-1 items-end h-3">
            <motion.div className="w-1 bg-chart-2 rounded-t" animate={{ height: ['20%', '100%', '40%'] }} transition={{ repeat: Infinity, duration: 0.5 }} />
            <motion.div className="w-1 bg-chart-2 rounded-t" animate={{ height: ['60%', '30%', '100%'] }} transition={{ repeat: Infinity, duration: 0.4 }} />
            <motion.div className="w-1 bg-chart-2 rounded-t" animate={{ height: ['100%', '50%', '80%'] }} transition={{ repeat: Infinity, duration: 0.6 }} />
          </div>
        )}
      </div>

      {/* MAIN CONTENT AREA - DYNAMIC ROUTING */}
      <div className="flex-1 overflow-hidden z-10 p-4">
        <AnimatePresence mode="wait">
          
          {/* WAR ROOM VIEW */}
          {state.currentView === 'war_room' && (
            <motion.div 
              key="war_room"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="h-full flex gap-4"
            >
              {/* Center: Main Directive */}
              <div className="flex-[2] flex flex-col gap-4">
                <div className="flex-[1.5] border border-primary/30 bg-black/60 backdrop-blur-xl rounded-lg p-6 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
                  <h2 className="text-sm text-primary flex items-center gap-2 uppercase tracking-widest font-bold mb-4">
                    <Target className="w-5 h-5" /> Captain's Execution Protocol
                  </h2>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-3xl font-bold tracking-wide text-foreground leading-tight mb-6">{state.primaryDirective.description}</div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg relative overflow-hidden group">
                        <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
                        <div className="text-[9px] text-primary uppercase font-bold mb-1">Why This?</div>
                        <div className="text-xs text-foreground/90">{state.primaryDirective.whyThis}</div>
                      </div>
                      <div className="bg-chart-5/5 border border-chart-5/20 p-4 rounded-lg relative overflow-hidden group">
                        <div className="absolute left-0 top-0 h-full w-1 bg-chart-5" />
                        <div className="text-[9px] text-chart-5 uppercase font-bold mb-1">Why NOT That?</div>
                        <div className="text-xs text-foreground/90">{state.primaryDirective.whyNotThat}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explainability Matrix */}
                <div className="flex-1 border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-4 flex flex-col">
                  <h2 className="text-[10px] text-primary mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
                    <LineChart className="w-4 h-4" /> Tactical Tradeoff Matrix
                  </h2>
                  <div className="flex-1 flex gap-4">
                    {state.tradeoffMatrix.map((item, i) => (
                      <div key={i} className={`flex-1 border rounded-lg p-3 ${i === 0 ? 'border-primary/40 bg-primary/5' : 'border-border/30 bg-background/50'}`}>
                        <div className="font-bold text-xs mb-2 text-foreground">{item.strategy}</div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <div className="text-[8px] text-chart-2 uppercase mb-1">Pros</div>
                            <ul className="list-disc pl-3 text-[9px] text-foreground/80 space-y-0.5">
                              {item.pros.map((p, j) => <li key={j}>{p}</li>)}
                            </ul>
                          </div>
                          <div className="flex-1">
                            <div className="text-[8px] text-chart-5 uppercase mb-1">Cons</div>
                            <ul className="list-disc pl-3 text-[9px] text-foreground/80 space-y-0.5">
                              {item.cons.map((c, j) => <li key={j}>{c}</li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Telemetry & Memory */}
              <div className="flex-1 flex flex-col gap-4">
                 <div className="flex-1 border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-4 flex flex-col">
                    <h2 className="text-[10px] text-primary mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
                      <BrainCircuit className="w-4 h-4" /> Confidence Rationale
                    </h2>
                    <div className="flex-1 text-[11px] text-foreground/90 leading-relaxed bg-black/40 p-4 rounded border border-border/30">
                      {state.primaryDirective.rationale}
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {/* MULTIVERSE ENGINE VIEW */}
          {state.currentView === 'multiverse' && (
            <motion.div 
              key="multiverse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col gap-4"
            >
               <div className="h-16 flex items-center justify-between border border-chart-4/30 bg-chart-4/5 rounded-lg px-6">
                 <div className="flex items-center gap-3">
                   <Globe className="w-6 h-6 text-chart-4" />
                   <div>
                     <div className="text-chart-4 font-bold uppercase tracking-widest text-sm">Tactical Multiverse Engine</div>
                     <div className="text-[9px] text-muted-foreground">Simulating counterfactual branches via Monte Carlo</div>
                   </div>
                 </div>
               </div>

               <div className="flex-1 flex gap-4 overflow-hidden">
                 {/* Left: Alternate Universe Cards */}
                 <div className="flex-[2] flex gap-4">
                   {state.alternateFutures.map((future, i) => (
                     <div key={i} className="flex-1 border border-border/30 bg-black/60 backdrop-blur-md rounded-lg p-5 flex flex-col hover:border-chart-4/50 hover:bg-chart-4/5 transition-colors cursor-pointer group">
                       <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Universe {future.id.toUpperCase()}</div>
                       <div className="text-lg font-bold text-foreground mb-4">{future.scenario}</div>
                       
                       <div className="flex gap-4 mb-4">
                         <div className="flex-1 bg-background/50 p-2 rounded border border-border/50">
                           <div className="text-[8px] text-muted-foreground uppercase">Win Prob Delta</div>
                           <div className={`text-sm font-bold ${future.winProbDelta > 0 ? 'text-chart-2' : 'text-chart-5'}`}>
                             {future.winProbDelta > 0 ? '+' : ''}{future.winProbDelta}%
                           </div>
                         </div>
                         <div className="flex-1 bg-background/50 p-2 rounded border border-border/50">
                           <div className="text-[8px] text-muted-foreground uppercase">Collapse Risk</div>
                           <div className="text-sm font-bold text-chart-4">{future.collapseProb}%</div>
                         </div>
                       </div>
                       
                       <div className="text-[10px] text-foreground/80 flex-1">{future.description}</div>
                       <div className="mt-4 text-[9px] text-chart-4 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                         Enter Branch &gt;&gt;
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </motion.div>
          )}

          {/* OBSERVABILITY VIEW */}
          {state.currentView === 'observability' && (
            <motion.div 
              key="observability"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="h-full flex gap-4"
            >
              <div className="flex-[2] border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-6 flex flex-col relative">
                 <div className="absolute top-0 right-0 p-4">
                   <div className="px-3 py-1 bg-primary/10 border border-primary/30 rounded text-primary text-[10px] font-bold uppercase tracking-widest animate-pulse">
                     System Intelligence Active
                   </div>
                 </div>
                 
                 <h2 className="text-lg text-primary flex items-center gap-2 uppercase tracking-widest font-bold mb-6">
                    <Database className="w-5 h-5" /> Gemini Telemetry Metrics
                 </h2>
                 
                 <div className="grid grid-cols-3 gap-6 mb-8">
                   <div className="bg-background/40 border border-border/30 p-4 rounded-lg">
                     <div className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1">Active Model</div>
                     <div className="text-sm font-bold text-primary">{state.telemetryMetrics.activeModel}</div>
                   </div>
                   <div className="bg-background/40 border border-border/30 p-4 rounded-lg">
                     <div className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1">Throughput</div>
                     <div className="text-sm font-bold text-chart-2">{state.telemetryMetrics.throughput}</div>
                   </div>
                   <div className="bg-background/40 border border-border/30 p-4 rounded-lg">
                     <div className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1">Convergence</div>
                     <div className="text-sm font-bold text-chart-4">{state.telemetryMetrics.convergenceRate}</div>
                   </div>
                   <div className="bg-background/40 border border-border/30 p-4 rounded-lg">
                     <div className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1">Cycle ID</div>
                     <div className="text-sm font-bold text-muted-foreground">{state.telemetryMetrics.orchestrationCycleId}</div>
                   </div>
                   <div className="bg-background/40 border border-border/30 p-4 rounded-lg">
                     <div className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1">Total Tokens</div>
                     <div className="text-sm font-bold text-foreground">{state.telemetryMetrics.tokenUsage.toLocaleString()}</div>
                   </div>
                 </div>

                 <h2 className="text-sm text-primary flex items-center gap-2 uppercase tracking-widest font-bold mb-4">
                    <Network className="w-4 h-4" /> Orchestration Node Graph
                 </h2>
                 <div className="flex-1 flex flex-col gap-2">
                   {state.orchestrationNodes.map((node, i) => (
                     <div key={i} className="flex items-center gap-4 p-2 bg-background/30 rounded border border-border/20">
                       <div className="w-32 font-bold text-[10px]">{node.name}</div>
                       <div className="text-[8px] text-primary uppercase w-16">{node.status}</div>
                       <div className="flex-1 h-1.5 bg-secondary rounded overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${node.load}%` }}
                          />
                       </div>
                       <div className="w-8 text-right text-[9px] text-muted-foreground">{node.load}%</div>
                     </div>
                   ))}
                 </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
