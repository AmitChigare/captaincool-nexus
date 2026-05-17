# CaptainCool Nexus 🏏🤖

**CaptainCool Nexus** is a research-grade, autonomous AI cricket command center. 
Built on a high-performance Next.js 15 App Router architecture, it simulates a state-of-the-art Formula 1 pit-wall and military command center, entirely dedicated to real-time cricket tactical intelligence.

## 🚀 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (with custom Dark Tactical Theme)
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui & Lucide React icons
- **State Management:** Zustand
- **Data Fetching:** React Query
- **AI Ecosystem integration:** Gemini 2.5 Pro, Gemini 2.5 Flash, Vertex AI, Google ADK

## 📂 Architecture Structure

This repository is organized to support multi-agent collaboration, memory persistence, and telemetry:

```text
src/
├── agents/
│   ├── orchestration/    # Coordinates Gemini 2.5 Pro and Flash
│   ├── persona/          # "Captain" Persona (MS Dhoni style logic)
│   └── consensus/        # Resolves tactical conflicts between agents
├── components/
│   ├── dashboard/        # Main F1 Pit-wall UI (CommandCenter.tsx)
│   ├── panels/           # Telemetry panels
│   └── telemetry/        # Live match data visualizations
├── lib/
│   ├── adk/              # Google ADK Integration
│   ├── memory/           # Long-context tactical memory
│   ├── multimodal/       # Process live video/audio feeds
│   ├── simulation/       # Runs forward-pass match simulations
│   ├── telemetry/        # Collects and parses match data
│   └── tools/            # External AI tool execution
├── store/                # Zustand State management
└── app/                  # Next.js App Router (Pages & Layout)
```

## 🎮 Command Center Features
1. **Live Orchestration Console:** Real-time metrics on running agents (load, role, subsystem).
2. **Animated Telemetry Panels:** Tactical metrics (Win probability, pitch conditions) visualized with Framer Motion.
3. **Consensus Engine Debate Stream:** Live view of the agents (Tactics vs Data) arguing and formulating strategy.
4. **Simulation Timeline:** Projecting the outcomes of the next 3 deliveries.
5. **Score Intelligence Ribbon:** At-a-glance match situation.
6. **Live Directives:** Actionable insights based on multimodal feed analysis.

## 🛠 Getting Started
```bash
# Start the development server
npm run dev
```

Visit `http://localhost:3000` to access the Nexus.
