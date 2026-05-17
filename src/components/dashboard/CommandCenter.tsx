"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexusStore } from '@/store/nexusStore';
import { 
  Activity, Shield, Cpu, Zap, Wifi, Eye, 
  BrainCircuit, Crosshair, Radar, Trophy, 
  BarChart4, Clock, Network, MessageSquare,
  ChevronRight, AlertTriangle, Fingerprint
} from 'lucide-react';

export default function CommandCenter() {
  const [mounted, setMounted] = useState(false);
  const state = useNexusStore();

  useEffect(() => {
    setMounted(true);
    
    // Simulate real-time orchestration loads
    const interval = setInterval(() => {
      state.updateAgentLoad('multimodal', 80 + Math.random() * 20);
      state.updateAgentLoad('sim', 30 + Math.random() * 60);
      state.updateAgentLoad('tools', 60 + Math.random() * 40);
    }, 2000);

    return () => clearInterval(interval);
  }, [state]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden text-foreground font-mono text-xs md:text-sm">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/90 via-background/50 to-background/90 pointer-events-none z-0" />

      {/* TOP: Live Match Ribbon */}
      <header className="h-16 shrink-0 border-b border-primary/20 bg-black/60 backdrop-blur-xl flex items-center justify-between px-6 z-10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-destructive font-bold uppercase tracking-widest text-[10px] leading-none">Live Analysis</span>
              <span className="text-primary font-bold uppercase tracking-widest text-lg leading-tight">NEXUS PRIME</span>
            </div>
          </div>
          <div className="h-8 w-px bg-border/50 mx-2" />
          <div className="flex gap-6 items-center bg-card/40 px-4 py-1.5 rounded-sm border border-primary/10">
            <div className="text-sm font-bold tracking-widest flex items-baseline gap-2">
              <span className="text-muted-foreground text-xs">{state.matchContext.battingTeam}</span> {state.matchContext.score} <span className="text-muted-foreground font-normal text-xs">({state.matchContext.overs})</span>
            </div>
            <div className="text-muted-foreground text-xs">vs</div>
            <div className="text-sm font-bold tracking-widest flex items-baseline gap-2">
              <span className="text-muted-foreground text-xs">{state.matchContext.bowlingTeam}</span> 192/8 <span className="text-muted-foreground font-normal text-xs">(20.0)</span>
            </div>
          </div>
          <div className="text-xs text-chart-2 font-bold bg-chart-2/10 px-3 py-1 rounded-sm border border-chart-2/20">
            Win Prob: {state.matchContext.winProbability}% (+2.1%)
          </div>
        </div>

        <div className="flex items-center gap-6 text-[10px] text-muted-foreground tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" /> Gemini 2.5 Pro
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-chart-2" /> Flash Sim
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-chart-4" /> ADK Sync: <span className="text-chart-2">{state.matchContext.latency}ms</span>
          </div>
        </div>
      </header>

      {/* MIDDLE SECTION (3 Columns) */}
      <div className="flex-1 flex overflow-hidden z-10 p-4 gap-4">
        
        {/* LEFT: Tactical Control Panel */}
        <aside className="w-72 shrink-0 flex flex-col gap-4">
          <div className="flex-1 border border-primary/20 bg-black/40 backdrop-blur-md rounded-lg p-4 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <h2 className="text-[10px] text-primary mb-4 flex items-center gap-2 uppercase tracking-widest font-bold">
              <Network className="w-4 h-4" /> Orchestration Layer
            </h2>
            
            <div className="space-y-4">
              {state.activeAgents.map((sys, i) => {
                const color = i === 0 ? 'bg-chart-1' : i === 1 ? 'bg-chart-2' : i === 2 ? 'bg-chart-3' : 'bg-chart-4';
                const glow = i === 0 ? 'shadow-[0_0_10px_rgba(0,255,255,0.5)]' : i === 3 ? 'shadow-[0_0_10px_rgba(255,165,0,0.5)]' : '';
                return (
                  <div key={i} className="p-3 rounded border border-border/50 bg-background/50 hover:bg-secondary/30 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs font-bold">{sys.name}</div>
                      <div className="text-[10px] text-primary">{sys.status}</div>
                    </div>
                    <div className="h-1 w-full bg-secondary rounded overflow-hidden">
                      <motion.div 
                        className={`h-full ${color} ${glow}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${sys.load}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <h2 className="text-[10px] text-primary mt-8 mb-4 flex items-center gap-2 uppercase tracking-widest font-bold">
              <Fingerprint className="w-4 h-4" /> Agent Personas
            </h2>
            <div className="space-y-2">
               <div className="flex items-center gap-3 p-2 rounded border border-primary/30 bg-primary/5">
                 <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                   <Shield className="w-4 h-4 text-primary" />
                 </div>
                 <div>
                   <div className="text-xs font-bold">CaptainCool Persona</div>
                   <div className="text-[10px] text-muted-foreground">Tactical Override Authority</div>
                 </div>
               </div>
            </div>
          </div>
        </aside>

        {/* CENTER: Captain Decision Engine */}
        <main className="flex-1 border border-primary/30 bg-black/50 backdrop-blur-xl rounded-lg p-6 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.05)] inset-ring inset-ring-primary/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm text-primary flex items-center gap-2 uppercase tracking-widest font-bold">
              <BrainCircuit className="w-5 h-5 animate-pulse" /> Captain Decision Engine
            </h2>
            <div className="px-3 py-1 border border-chart-2/50 bg-chart-2/10 text-chart-2 rounded text-xs animate-pulse">
              {state.orchestrationStatus}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
             {/* Current Situation Box */}
             <div className="p-5 border border-border/50 bg-background/40 rounded-lg">
               <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Contextual Analysis (Gemini 2.5 Pro)</div>
               <p className="text-sm leading-relaxed text-foreground/90">
                 <span className="text-primary font-bold">Observation:</span> The opposition bowler (Starc) is preparing for the 16th over. Multimodal feed detects a grip change indicating off-cutters. Long-context memory confirms Starc uses this variation 72% of the time against right-handers in overs 16-20 on deteriorating pitches.
               </p>
             </div>

             {/* Primary Directive */}
             <div className="flex-1 border-l-4 border-chart-2 bg-gradient-to-r from-chart-2/10 to-transparent p-6 rounded-r-lg flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-chart-2/20 text-chart-2 rounded-md">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-chart-2 font-bold uppercase tracking-widest">{state.primaryDirective.title}</div>
                    <div className="text-2xl font-bold tracking-wide mt-1 text-foreground">{state.primaryDirective.description}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="p-3 border border-border/30 bg-background/50 rounded">
                    <div className="text-[10px] text-muted-foreground uppercase">Success Prob</div>
                    <div className="text-lg font-bold text-chart-2 mt-1">{state.primaryDirective.successProb}%</div>
                  </div>
                  <div className="p-3 border border-border/30 bg-background/50 rounded">
                    <div className="text-[10px] text-muted-foreground uppercase">Risk Level</div>
                    <div className="text-lg font-bold text-chart-4 mt-1">{state.primaryDirective.riskLevel}</div>
                  </div>
                  <div className="p-3 border border-border/30 bg-background/50 rounded">
                    <div className="text-[10px] text-muted-foreground uppercase">Alt Action</div>
                    <div className="text-sm font-bold text-muted-foreground mt-2">Pre-meditate sweep (Prob: 32%)</div>
                  </div>
                </div>
             </div>
          </div>
        </main>

        {/* RIGHT: Live AI Debate Stream */}
        <aside className="w-80 shrink-0 border border-primary/20 bg-black/40 backdrop-blur-md rounded-lg p-4 flex flex-col relative">
          <h2 className="text-[10px] text-primary mb-4 flex items-center gap-2 uppercase tracking-widest font-bold">
            <MessageSquare className="w-4 h-4" /> Live AI Debate Stream
          </h2>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-none">
            {state.debateStream.map((msg, i) => (
              <div key={i} className={`p-3 rounded-lg border relative ${msg.agentName === 'Captain Persona' ? 'bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'bg-background/60 border-border/30'} ${i === 1 ? 'ml-4' : ''}`}>
                <div className={`absolute -left-1 top-4 w-2 h-2 rounded-full ${msg.color}`} />
                <div className={`text-[10px] font-bold mb-1 flex justify-between uppercase tracking-wider text-muted-foreground`}>
                  <span className={msg.agentName === 'Captain Persona' ? 'text-primary' : (i===0 ? 'text-chart-1' : 'text-chart-2')}>{msg.agentName}</span>
                </div>
                <div className={`text-xs leading-relaxed ${msg.agentName === 'Captain Persona' ? 'font-semibold' : 'text-foreground/80'}`}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* BOTTOM: Telemetry Dashboard */}
      <footer className="h-48 shrink-0 p-4 pt-0 z-10 flex gap-4">
        
        {/* Pitch Heatmap Map */}
        <div className="w-72 border border-primary/20 bg-black/40 backdrop-blur-md rounded-lg p-3 flex flex-col">
           <h3 className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
              <Crosshair className="w-3 h-3 text-chart-4" /> Delivery Heatmap
           </h3>
           <div className="flex-1 relative flex items-center justify-center">
              {/* Fake Pitch */}
              <div className="w-16 h-full bg-[#1a1a1a] border border-border/50 relative">
                {/* Crease lines */}
                <div className="absolute top-4 w-full h-px bg-white/30" />
                <div className="absolute bottom-4 w-full h-px bg-white/30" />
                
                {/* Heatmap spots */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-6 h-8 bg-chart-5/40 blur-md rounded-full" />
                <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-chart-4/50 blur-sm rounded-full" />
              </div>
           </div>
        </div>

        {/* Timeline Metrics */}
        <div className="flex-1 border border-primary/20 bg-black/40 backdrop-blur-md rounded-lg p-3 flex flex-col">
           <div className="flex justify-between items-center mb-2">
             <h3 className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-3 h-3 text-chart-1" /> Over-by-Over Win Probability
             </h3>
             <div className="text-[10px] text-chart-2 border border-chart-2/30 px-2 py-0.5 rounded bg-chart-2/10 animate-pulse">
               Recording Telemetry
             </div>
           </div>
           
           <div className="flex-1 flex items-end justify-between gap-1 px-2 pb-2">
              {[...Array(30)].map((_, i) => {
                const height = 40 + Math.sin(i * 0.2) * 30 + Math.random() * 20;
                const isRecent = i > 25;
                return (
                  <motion.div 
                    key={i}
                    className={`w-full rounded-t-sm ${isRecent ? 'bg-primary' : 'bg-primary/30'}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.02 }}
                  />
                )
              })}
           </div>
        </div>

        {/* ADK Tools Stream */}
        <div className="w-80 border border-primary/20 bg-black/40 backdrop-blur-md rounded-lg p-3 flex flex-col">
           <h3 className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-chart-5" /> Active Interventions
           </h3>
           <div className="flex-1 overflow-y-auto space-y-2 scrollbar-none">
             {[
               { time: "15.2", msg: "Called Function: getPitchDeterioration()", status: "Done", color: "text-chart-2" },
               { time: "15.2", msg: "ADK Update: Wind shift +12km/h SE", status: "Logged", color: "text-muted-foreground" },
               { time: "15.1", msg: "Called Function: analyzeGrip(multimodal)", status: "Done", color: "text-chart-2" },
             ].map((log, i) => (
               <div key={i} className="flex gap-3 text-[10px] border-b border-border/20 pb-1">
                 <span className="text-primary">{log.time}</span>
                 <span className="flex-1 truncate">{log.msg}</span>
                 <span className={log.color}>{log.status}</span>
               </div>
             ))}
           </div>
        </div>
        
      </footer>
    </div>
  );
}
