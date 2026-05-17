"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexusStore } from '@/store/nexusStore';
import { 
  Activity, Shield, Cpu, Zap, Wifi, Eye, 
  BrainCircuit, Crosshair, Radar, Trophy, 
  BarChart4, Clock, Network, MessageSquare,
  AlertTriangle, Fingerprint, Database, XOctagon, LineChart
} from 'lucide-react';

export default function CommandCenter() {
  const [mounted, setMounted] = useState(false);
  const state = useNexusStore();

  useEffect(() => {
    setMounted(true);
    
    const interval = setInterval(() => {
      state.updateAgentLoad('multimodal', 80 + Math.random() * 20);
      state.updateAgentLoad('sim', 30 + Math.random() * 60);
      state.updateAgentLoad('tools', 60 + Math.random() * 40);
      
      // Simulate random telemetry logs
      if (Math.random() > 0.7) {
        state.logTelemetry({
          agent: 'Statistics',
          event: 'TOOL_INVOKED',
          message: 'Invoked getPlayerMatchupStats(batsman="Kohli", bowler="Starc")'
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [state]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden text-foreground font-mono text-[10px] md:text-xs">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/90 via-background/50 to-background/90 pointer-events-none z-0" />

      {/* TOP: Live Match Ribbon */}
      <header className="h-14 shrink-0 border-b border-primary/20 bg-black/60 backdrop-blur-xl flex items-center justify-between px-6 z-10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-destructive font-bold uppercase tracking-widest text-[8px] leading-none">Live Tools</span>
              <span className="text-primary font-bold uppercase tracking-widest text-sm leading-tight">NEXUS PRIME</span>
            </div>
          </div>
          <div className="h-6 w-px bg-border/50 mx-2" />
          <div className="flex gap-4 items-center bg-card/40 px-3 py-1 rounded-sm border border-primary/10 text-xs">
            <div className="font-bold tracking-widest flex items-baseline gap-2">
              <span className="text-muted-foreground text-[10px]">{state.matchContext.battingTeam}</span> {state.matchContext.score} <span className="text-muted-foreground font-normal text-[10px]">({state.matchContext.overs})</span>
            </div>
            <div className="text-muted-foreground text-[10px]">vs</div>
            <div className="font-bold tracking-widest flex items-baseline gap-2">
              <span className="text-muted-foreground text-[10px]">{state.matchContext.bowlingTeam}</span> 192/8 <span className="text-muted-foreground font-normal text-[10px]">(20.0)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[10px] text-muted-foreground tracking-widest uppercase">
          <div className="flex items-center gap-1"><Cpu className="w-3 h-3 text-primary" /> ADK Sync: {state.matchContext.latency}ms</div>
          <div className="flex items-center gap-1"><Database className="w-3 h-3 text-chart-2" /> Memory Reads: {state.metrics.memoryRetrievalCount}</div>
          <div className="flex items-center gap-1"><Activity className="w-3 h-3 text-chart-4" /> Tokens: {state.metrics.tokenUsage}</div>
        </div>
      </header>

      {/* MIDDLE SECTION (3 Columns) */}
      <div className="flex-1 flex overflow-hidden z-10 p-4 gap-4">
        
        {/* LEFT COL: Orchestration & Rejected Strategies */}
        <aside className="w-72 flex flex-col gap-4 shrink-0">
          <div className="h-1/2 border border-primary/20 bg-black/40 backdrop-blur-md rounded-lg p-4 flex flex-col relative overflow-hidden">
            <h2 className="text-[10px] text-primary mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
              <Network className="w-3 h-3" /> ADK Subsystems
            </h2>
            <div className="space-y-3">
              {state.activeAgents.map((sys, i) => (
                <div key={i} className="p-2 rounded border border-border/50 bg-background/50">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-bold text-[10px]">{sys.name}</div>
                    <div className="text-[8px] text-primary">{sys.status}</div>
                  </div>
                  <div className="h-0.5 w-full bg-secondary rounded overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary shadow-[0_0_5px_rgba(0,255,255,0.5)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${sys.load}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 border border-chart-5/30 bg-chart-5/5 backdrop-blur-md rounded-lg p-4 flex flex-col relative overflow-hidden">
            <h2 className="text-[10px] text-chart-5 mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
              <XOctagon className="w-3 h-3" /> Rejected Strategies
            </h2>
            <div className="space-y-2 overflow-y-auto pr-1">
              {state.rejectedStrategies.map((strat, i) => (
                <div key={i} className="p-2 border border-chart-5/20 bg-black/40 rounded text-chart-5/80 text-[10px] line-through">
                  {strat}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER: Captain Decision & Consensus Graph */}
        <main className="flex-1 flex flex-col gap-4">
          <div className="flex-1 border border-primary/30 bg-black/50 backdrop-blur-xl rounded-lg p-5 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.05)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs text-primary flex items-center gap-2 uppercase tracking-widest font-bold">
                <BrainCircuit className="w-4 h-4 animate-pulse" /> Captain Persona Synthesis
              </h2>
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
               {/* Primary Directive */}
               <div className="flex-1 border-l-2 border-chart-2 bg-gradient-to-r from-chart-2/10 to-transparent p-4 flex flex-col justify-center">
                  <div className="text-[10px] text-chart-2 font-bold uppercase tracking-widest">{state.primaryDirective.title}</div>
                  <div className="text-xl font-bold tracking-wide mt-1 text-foreground">{state.primaryDirective.description}</div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-2 bg-background/50 rounded">
                      <div className="text-[8px] text-muted-foreground uppercase">Success Prob</div>
                      <div className="text-sm font-bold text-chart-2 mt-0.5">{state.primaryDirective.successProb}%</div>
                    </div>
                    <div className="p-2 bg-background/50 rounded">
                      <div className="text-[8px] text-muted-foreground uppercase">Risk Level</div>
                      <div className="text-sm font-bold text-chart-4 mt-0.5">{state.primaryDirective.riskLevel}</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="h-40 border border-primary/20 bg-black/40 backdrop-blur-md rounded-lg p-4 flex flex-col">
            <h2 className="text-[10px] text-primary mb-2 flex items-center gap-2 uppercase tracking-widest font-bold">
              <LineChart className="w-3 h-3" /> Consensus Evolution (Confidence %)
            </h2>
            <div className="flex-1 flex items-end justify-between px-2 gap-1 pb-1 border-b border-l border-border/50">
              {state.consensusHistory.map((pt, i) => (
                <div key={i} className="flex flex-col items-center gap-1 w-full relative group">
                  <motion.div 
                    className="w-full bg-chart-1/50 rounded-t hover:bg-chart-1 transition-colors"
                    initial={{ height: 0 }}
                    animate={{ height: `${pt.value}%` }}
                  />
                  <span className="text-[8px] text-muted-foreground absolute -bottom-4">{pt.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* RIGHT COL: Debate Stream & Memory Timeline */}
        <aside className="w-80 flex flex-col gap-4 shrink-0">
          <div className="flex-1 border border-primary/20 bg-black/40 backdrop-blur-md rounded-lg p-4 flex flex-col">
            <h2 className="text-[10px] text-primary mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
              <MessageSquare className="w-3 h-3" /> Multi-Agent Debate
            </h2>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-none">
              {state.debateStream.map((msg, i) => (
                <div key={i} className={`p-2 rounded border relative ${msg.agentName === 'Captain Persona' ? 'bg-primary/10 border-primary/30' : 'bg-background/60 border-border/30'} ${i === 1 ? 'ml-3' : ''}`}>
                  <div className={`absolute -left-1 top-3 w-1.5 h-1.5 rounded-full ${msg.color}`} />
                  <div className={`text-[8px] font-bold mb-0.5 flex justify-between uppercase tracking-wider text-muted-foreground`}>
                    <span className={msg.agentName === 'Captain Persona' ? 'text-primary' : 'text-foreground'}>{msg.agentName}</span>
                  </div>
                  <div className={`text-[10px] leading-relaxed ${msg.agentName === 'Captain Persona' ? 'font-semibold' : 'text-foreground/80'}`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-1/3 border border-primary/20 bg-black/40 backdrop-blur-md rounded-lg p-4 flex flex-col">
            <h2 className="text-[10px] text-primary mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
              <Database className="w-3 h-3" /> Memory Retrieval Timeline
            </h2>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
               <div className="border-l border-primary/30 pl-2 ml-1 relative">
                 <div className="absolute -left-[3px] top-1 w-1.5 h-1.5 rounded-full bg-chart-4" />
                 <div className="text-[8px] text-muted-foreground">Historical Pattern [Starc vs RHB]</div>
                 <div className="text-[10px] truncate text-foreground/80">Found 72% off-cutter usage in death overs</div>
               </div>
               <div className="border-l border-primary/30 pl-2 ml-1 relative mt-2">
                 <div className="absolute -left-[3px] top-1 w-1.5 h-1.5 rounded-full bg-chart-3" />
                 <div className="text-[8px] text-muted-foreground">Tactical Revision [Over 12]</div>
                 <div className="text-[10px] truncate text-foreground/80">Previous sweep attempt failed</div>
               </div>
            </div>
          </div>
        </aside>
      </div>

      {/* BOTTOM: Execution Traces & Function Calling Telemetry */}
      <footer className="h-40 shrink-0 px-4 pb-4 z-10 flex flex-col">
        <div className="flex-1 border border-primary/20 bg-black/40 backdrop-blur-md rounded-lg p-3 flex flex-col overflow-hidden">
           <div className="flex items-center justify-between mb-2">
             <h3 className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2 font-bold">
                <AlertTriangle className="w-3 h-3 text-chart-2" /> Active Function Calling Trace (Google ADK)
             </h3>
             {state.activeTool && (
               <div className="text-[8px] bg-chart-2/20 text-chart-2 px-2 py-0.5 rounded border border-chart-2/30 animate-pulse flex items-center gap-1">
                 Executing Tool: {state.activeTool}
               </div>
             )}
           </div>
           
           <div className="flex-1 overflow-y-auto bg-[#0a0a0a] rounded border border-border/30 p-2 font-mono text-[9px] text-green-400/80 space-y-1">
             {state.telemetryLogs.map((log, i) => (
               <div key={i} className="flex gap-4 border-b border-white/5 pb-0.5">
                 <span className="text-muted-foreground shrink-0 w-24">[{log.timestamp.split('T')[1].split('Z')[0]}]</span>
                 <span className="text-primary/70 shrink-0 w-24 uppercase">[{log.agent}]</span>
                 <span className={`shrink-0 w-28 uppercase ${log.event === 'TOOL_INVOKED' ? 'text-chart-2 font-bold' : 'text-chart-4'}`}>{log.event}</span>
                 <span className="truncate">{log.message}</span>
               </div>
             ))}
           </div>
        </div>
      </footer>
    </div>
  );
}
