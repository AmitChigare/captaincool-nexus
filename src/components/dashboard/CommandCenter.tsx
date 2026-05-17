"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNexusStore } from '@/store/nexusStore';
import { 
  Cpu, Zap, BrainCircuit, Target, Flame, GitMerge,
  MessageSquare, XOctagon, LineChart, Network,
  Camera, Link, Mic, Database, TrendingUp, AlertCircle
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
              <span className="text-destructive font-bold uppercase tracking-widest text-[7px] leading-none">Multimodal Engine</span>
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

        <div className="flex items-center gap-4 text-[9px] text-muted-foreground tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors px-2 py-1 rounded text-primary">
              <Camera className="w-3 h-3" /> Image
            </button>
            <button className="flex items-center gap-1 border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors px-2 py-1 rounded text-primary">
              <Link className="w-3 h-3" /> URL
            </button>
            <button className="flex items-center gap-1 border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-colors px-2 py-1 rounded text-primary">
              <Mic className="w-3 h-3" /> Voice
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT MATRIX */}
      <div className="flex-1 flex overflow-hidden z-10 p-2 gap-2">
        
        {/* COL 1: Multimodal Analysis & Tactical Memory */}
        <aside className="w-72 flex flex-col gap-2 shrink-0">
          
          {/* Multimodal State */}
          <div className="h-1/2 border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-3 flex flex-col relative overflow-hidden">
            <h2 className="text-[9px] text-primary mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
              <Camera className="w-3 h-3" /> Gemini Vision Analysis
            </h2>
            {state.multimodalState.analysis ? (
              <div className="flex-1 overflow-y-auto space-y-2">
                <div className="text-[8px] bg-primary/20 text-primary px-2 py-1 rounded border border-primary/30 mb-2">
                  Source: {state.multimodalState.sourceType} (Conf: {state.multimodalState.analysis.confidence})
                </div>
                {Object.entries(state.multimodalState.analysis).filter(([k]) => k !== 'confidence').map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-border/30 pb-1">
                    <span className="text-[8px] text-muted-foreground uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-[9px] font-bold text-foreground text-right w-32 truncate">{String(value)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[10px] text-muted-foreground animate-pulse">
                Awaiting Multimodal Input...
              </div>
            )}
          </div>

          {/* Tactical Memory Timeline */}
          <div className="flex-1 border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-3 flex flex-col">
            <h2 className="text-[9px] text-primary mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
              <Database className="w-3 h-3" /> Retrieved Tactical Memory
            </h2>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {state.tacticalMemoryTimeline.map((mem, i) => (
                <div key={mem.id} className="border-l-2 border-chart-2 pl-2 relative">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-chart-2" />
                  <div className="flex justify-between text-[8px]">
                    <span className="text-chart-2 uppercase font-bold">{mem.type.replace('_', ' ')}</span>
                    <span className="text-muted-foreground">Over {mem.contextOver}</span>
                  </div>
                  <div className="text-[9px] text-foreground/80 mt-1 leading-relaxed">{mem.content}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* COL 2: Captain's Engine & Debate Stream */}
        <main className="flex-[2] flex flex-col gap-2">
          
          <div className="h-32 border border-chart-2/40 bg-black/60 backdrop-blur-xl rounded-lg p-4 flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.03)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-chart-2 to-transparent opacity-50" />
            <h2 className="text-[11px] text-chart-2 flex items-center gap-2 uppercase tracking-widest font-bold mb-2">
              <Target className="w-4 h-4 animate-pulse" /> Captain's Execution Protocol
            </h2>
            <div className="text-xl font-bold tracking-wide text-foreground leading-tight">{state.primaryDirective.description}</div>
            <div className="text-[9px] text-muted-foreground mt-2">{state.primaryDirective.whyThis}</div>
          </div>

          {/* Momentum & Pressure Graphics */}
          <div className="h-40 flex gap-2">
            <div className="flex-1 border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-3 flex flex-col">
              <h2 className="text-[9px] text-primary mb-2 flex items-center gap-2 uppercase tracking-widest font-bold">
                <AlertCircle className="w-3 h-3" /> Pressure Swing Graph
              </h2>
              <div className="flex-1 flex items-end justify-between px-2 gap-2 pb-1 border-b border-l border-border/50 pt-4">
                {state.pressureSwingHistory.map((pt, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 w-full h-full justify-end relative group">
                    <motion.div 
                      className={`w-full ${pt.batting > pt.bowling ? 'bg-chart-5/50' : 'bg-primary/50'} rounded-t`}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(pt.batting, pt.bowling)}%` }}
                    />
                    <span className="text-[7px] text-muted-foreground absolute -bottom-4">Ov {pt.over}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-3 flex flex-col">
              <h2 className="text-[9px] text-primary mb-2 flex items-center gap-2 uppercase tracking-widest font-bold">
                <TrendingUp className="w-3 h-3" /> Momentum Evolution
              </h2>
              <div className="flex-1 flex items-end justify-between px-2 gap-2 pb-1 border-b border-l border-border/50 pt-4">
                {state.momentumEvolution.map((pt, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 w-full h-full justify-end relative group">
                    <motion.div 
                      className="w-full bg-chart-1/50 hover:bg-chart-1 transition-colors rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${pt.momentum * 10}%` }}
                    />
                    <span className="text-[7px] text-muted-foreground absolute -bottom-4">Ov {pt.over}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Debate Stream */}
          <div className="flex-1 border border-primary/20 bg-black/60 backdrop-blur-md rounded-lg p-3 flex flex-col">
            <h2 className="text-[9px] text-primary mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
              <MessageSquare className="w-3 h-3" /> Contextual AI Debate (With Memory)
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

        </main>
      </div>
    </div>
  );
}
