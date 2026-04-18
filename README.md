# ðŸ˜ï¸ RuraLens - AI-Powered Village Digital Twin

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-v18+-green.svg)
![React](https://img.shields.io/badge/react-18.3-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**Real-time monitoring and AI-powered insights for rural development projects**

[Features](#-key-features) â€¢ [Installation](#-quick-start) â€¢ [AI RAG System](#-ai-rag-system) â€¢ [Architecture](#-architecture) â€¢ [Demo](#-demo)

</div>

---

## ðŸ“‹ Overview

RuraLens is a cutting-edge village digital twin platform that combines real-time IoT monitoring, 3D visualization, and **AI-powered Retrieval-Augmented Generation (RAG)** to provide intelligent insights for rural development schemes. The platform enables administrators, field workers, and citizens to ask natural language questions and receive accurate, citation-backed answers from government documents and live data.

### ðŸŽ¯ Problem Solved

Rural development projects often suffer from:
- âŒ Information scattered across multiple documents
- âŒ Lack of real-time visibility into scheme progress
- âŒ Difficulty identifying discrepancies and delays
- âŒ Limited citizen engagement and feedback

### âœ¨ RuraLens Solution

- âœ… **AI-Powered Q&A**: Ask questions in plain language, get instant answers
- âœ… **Smart Citations**: Every answer backed by verifiable document sources
- âœ… **Real-Time Monitoring**: Live IoT sensor data and scheme tracking
- âœ… **Automated Compliance**: AI analyzes vendor reports vs government plans
- âœ… **Interactive 3D Maps**: Visualize projects and sensor locations

---

## ðŸš€ Key Features

### ðŸ¤– AI RAG System (Retrieval-Augmented Generation)

The crown jewel of RuraLens - an intelligent question-answering system that understands context and provides accurate, sourced answers.

#### **How It Works:**

```
User Question â†’ RAG Backend â†’ Pathway MCP â†’ Document Store
                    â†“              â†“              â†“
            PII Filter      Vector Search    Embeddings
                    â†“              â†“              â†“
            Rate Limit       LLM Processing  Knowledge Base
                    â†“              â†“              â†“
            Cache Check   â† Answer Generated â† Top Results
                    â†“
        Citation Enrichment (Geo + Metadata)
                    â†“
        Frontend Display with Map Integration
```

#### **RAG Features:**

| Feature | Description |
|---------|-------------|
| ðŸ” **Natural Language Queries** | Ask questions like "Why is Swachh Bharat delayed?" |
| ðŸ“š **Multi-Source Knowledge** | Searches schemes, reports, sensor data, citizen feedback |
| ðŸŽ¯ **Smart Citations** | Every answer includes source documents with relevance scores |
| ðŸ—ºï¸ **Map Integration** | Click citations to view locations on 3D map |
| âš¡ **Lightning Fast** | 120-second cache, sub-second responses |
| ðŸ”’ **PII Protection** | Auto-redacts sensitive information (Aadhaar, PAN, emails) |
| ðŸ“Š **Geo-Aware** | Citations include precise coordinates with 4-level fallback |

### ðŸ§  GNN Impact Predictor (Graph Neural Network)

Advanced infrastructure failure prediction using Graph Neural Networks to simulate cascading impacts across village infrastructure.

#### **GNN Features:**

| Feature | Description |
|---------|-------------|
| ðŸŒ **Real Infrastructure Network** | Auto-generates graph from water tanks, pumps, power nodes, buildings |
| ðŸ’¥ **Failure Simulation** | Click any infrastructure node to trigger realistic failures |
| ðŸ”„ **Cascading Impact** | AI predicts how failures propagate through connected infrastructure |
| ðŸ“Š **Impact Visualization** | Color-coded nodes show damage levels (green â†’ yellow â†’ orange â†’ red) |
| âž• **Dynamic Node Addition** | Right-click map to add new infrastructure nodes with auto-connections |
| ðŸ”— **Smart Edge Generation** | Nodes automatically connect based on type and proximity |
| ðŸ“ˆ **Accumulated Damage** | Multiple failures compound damage realistically |
| ðŸ—ºï¸ **Interactive 3D Map** | View entire infrastructure network on MapLibre GL with smooth animations |

#### **How GNN Works:**

```
Infrastructure Node Selected â†’ Trigger Failure
                    â†“
            GNN API Analysis (or Local Simulation)
                    â†“
        Calculate Impact Propagation via Edges
                    â†“
        Score Each Connected Node (0-100%)
                    â†“
        Update Map Visualization
                    â†“
        Display in InfoPanel with Details
```

#### **GNN Usage:**

1. **View Network**: Navigate to "Village Analyzer" from sidebar
2. **Explore Map**: All infrastructure appears as labeled nodes on 3D map
3. **Trigger Failure**: Click any node â†’ Select failure type and severity
4. **Watch Propagation**: See impacts spread through network in real-time
5. **Add Nodes**: Right-click map â†’ Add new infrastructure â†’ Auto-connects

#### **Example Scenarios:**

```
Scenario 1: Water Pump Failure
- Main Pump Station fails â†’ 
- Connected pipes show 60% impact â†’
- Hospital, School lose water supply (80% impact) â†’
- Consumer areas show reduced service (40-70%)

Scenario 2: Power Transformer Failure  
- Transformer fails â†’
- All pumps lose power (90% impact) â†’
- Entire water system compromised â†’
- Critical buildings affected

Scenario 3: Multiple Cascading Failures
- First failure: Pump at 50% damage
- Second failure: Same pump now 56% damage (accumulated)
- Third failure: Pump cascades to failure (>90%)
```

### ðŸ—ºï¸ Interactive 3D Map View

**Enhanced Visual Experience:**
- **Opaque Popups**: Beautiful gradient backgrounds (slate-900 â†’ slate-800) with glowing borders
- **Color-Coded Infrastructure**: Green (healthy) â†’ Yellow (impacted) â†’ Orange (severe) â†’ Red (failed)
- **Smooth Animations**: Pulsing failed nodes, glowing impacts
- **Detailed Tooltips**: Hover over nodes to see health, type, and impact details
- **Map Controls**: Zoom, pitch, rotation, fullscreen, reset view
- **Dual-Mode Display**: Normal monitoring + Failure simulation modes

### ðŸ“Š Real-Time Analytics & Monitoring

- **Live Dashboard**: Water quality, power consumption, scheme progress
- **Alert System**: Automatic notifications for critical infrastructure issues
- **Citizen Feedback**: Anonymous report system with GPS tracking
- **Government Schemes**: Track budget, timeline, and completion status

#### **Example Queries:**

```
Q: "What water problems are reported in Zone B?"
A: Citizens report water pressure issues in Zone B, particularly during peak hours 
   (7-9 AM) affecting approximately 45 households. Sensor data confirms 30% pressure 
   drop during these times.
   ðŸ“ Citations: [Sensor-042 (89% match), Citizen Report #127 (75% match)]

Q: "Why is MGNREGA road scheme delayed?"
A: The MGNREGA Rural Road Development is delayed by 14 days due to monsoon weather 
   impact and labor shortage. Vendor reported 40% workforce availability in October.
   ðŸ“ Citations: [Vendor Report Phase-2 (92% match), Weather Log (78% match)]

Q: "Show me all schemes with budget overruns"
A: 2 schemes show budget variance: S-123 (+12% due to material cost increase), 
   S-456 (+8% from scope expansion approved in review).
   ðŸ“ Citations: [Financial Report Q3 (94% match), Budget Analysis (81% match)]
```

---

## ðŸ—ï¸ Architecture

### System Components

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                        Frontend (React)                          â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚  Dashboard   â”‚  â”‚  RAG Modal   â”‚  â”‚  3D Map Viewer     â”‚   â”‚
â”‚  â”‚  Components  â”‚  â”‚  with        â”‚  â”‚  (MapLibre GL)     â”‚   â”‚
â”‚  â”‚              â”‚  â”‚  Citations   â”‚  â”‚  + GNN Viz         â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚ Impact       â”‚  â”‚ Failure      â”‚  â”‚  Node Addition     â”‚   â”‚
â”‚  â”‚ Predictor    â”‚  â”‚ Popups       â”‚  â”‚  Interface         â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                              â†“
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                   Backend (Node.js/Express)                      â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚  RAG Router  â”‚  â”‚  PII Filter  â”‚  â”‚  Cache Manager     â”‚   â”‚
â”‚  â”‚  + Auth      â”‚  â”‚  Sanitizer   â”‚  â”‚  (120s TTL)        â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚  Citation    â”‚  â”‚  Geo Fallbackâ”‚  â”‚  Audit Logger      â”‚   â”‚
â”‚  â”‚  Enrichment  â”‚  â”‚  4-Level     â”‚  â”‚  + Trace IDs       â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚  GNN Proxy   â”‚  â”‚ Infrastructureâ”‚  â”‚  Schemes API       â”‚   â”‚
â”‚  â”‚  Client      â”‚  â”‚  Graph Store â”‚  â”‚  Routes            â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                              â†“
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚              AI Services Layer                                   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ Pathway MCP Server (Python/Rust)                           â”‚ â”‚
â”‚  â”‚ â€¢ DocumentStore: Schemes, Reports, Sensors, Feedback       â”‚ â”‚
â”‚  â”‚ â€¢ VectorSearch: Embedding-based semantic search            â”‚ â”‚
â”‚  â”‚ â€¢ LLM: OpenAI/Gemini for answer generation                 â”‚ â”‚
â”‚  â”‚ â€¢ REST API: /v1/pw_ai_answer endpoint                      â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚ GNN Service (Python)                                        â”‚ â”‚
â”‚  â”‚ â€¢ Graph Neural Network for impact prediction               â”‚ â”‚
â”‚  â”‚ â€¢ Node embedding and feature extraction                    â”‚ â”‚
â”‚  â”‚ â€¢ Cascading failure simulation                             â”‚ â”‚
â”‚  â”‚ â€¢ REST API: /api/gnn/predict-structured endpoint           â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                              â†“
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                    MongoDB Database                              â”‚
â”‚  Collections: schemes, users, vendorReports, citizenReports,    â”‚
â”‚               feedback, gnnNodes, gnnEdges, infrastructureGraph  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Technology Stack

**Frontend:**
- âš›ï¸ React 18 with TypeScript
- ðŸŽ¨ Tailwind CSS for styling
- ðŸ—ºï¸ MapLibre GL for 3D maps
- ðŸ”Œ WebSocket for real-time updates
- ðŸ“± Capacitor for mobile apps
- ðŸŽ­ Lucide React for icons

**Backend:**
- ðŸŸ¢ Node.js with Express
- ðŸ” JWT authentication
- ðŸ’¾ MongoDB with Mongoose
- ðŸ¤– Gemini AI for document analysis
- ðŸ“Š WebSocket server for live data

**AI/RAG Layer:**
- ðŸ Python Pathway framework
- ðŸ¦€ Rust-powered vector search
- ðŸ§  OpenAI GPT-4 / Google Gemini
- ðŸ“š Document embeddings & semantic search

---

## âš¡ Quick Start

### Prerequisites

```bash
# Required
Node.js >= 18.x
Python >= 3.11
MongoDB >= 6.0
Git

# Optional (for production RAG)
WSL2 (Windows) or Linux
Docker (for containerized deployment)
```

### Installation

```bash
# 1. Clone repository
git clone https://github.com/Abhishekmishra2808/village-digital-twin.git
cd village-digital-twin

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd backend
npm install

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI, API keys, etc.

# 5. Start development servers
npm run dev        # Frontend (Port 3000)
npm start          # Backend (Port 3001, from backend folder)
```

### Quick RAG Setup (Mock Mode)

For immediate testing without full Pathway setup:

```bash
# 1. Install Flask
pip install flask

# 2. Start mock Pathway server
cd llm-app/templates/question_answering_rag
python mock_pathway_server.py
# Server runs on http://localhost:8080

# 3. Backend .env should have:
PATHWAY_MCP_URL=http://localhost:8080/v1/pw_ai_answer
PATHWAY_MCP_TOKEN=mock_token_for_development
```

### Production RAG Setup

For production with real Pathway server:

```bash
# On Linux/WSL2:
cd llm-app/templates/question_answering_rag
bash setup-wsl.sh

# Configure with your LLM API key
export OPENAI_API_KEY=your_key_here
# or
export GEMINI_API_KEY=your_key_here

# Run Pathway server
source pathway-env/bin/activate
python app.py
```

---

## ðŸŽ¨ Using the Platform

### 1. AI RAG Feature - "Ask AI"

The **"Ask AI"** button appears in:
- ðŸ“Š **Admin Dashboard** - Top right corner
- ðŸ‘¥ **Citizen Dashboard** - Top right corner  
- ðŸ“‹ **Schemes View** - Header toolbar

### 2. Village Analyzer (GNN Impact Predictor)

Access from the sidebar menu â†’ **"Village Analyzer"**

**Features:**
- ðŸŒ **View Infrastructure Network**: Automatically loaded from real village data
- ðŸ—ºï¸ **Interactive 3D Map**: All infrastructure nodes displayed with labels and icons
- ðŸ’¥ **Trigger Failures**: Click any node â†’ Select failure type and severity
- ðŸ“Š **Watch Impacts**: See how failures cascade through the network
- âž• **Add Nodes**: Right-click map â†’ Add new infrastructure with auto-connections
- ðŸ”„ **Reset Network**: Clear all failures and return to original state
- ðŸ“ˆ **Accumulated Damage**: Multiple failures compound realistically

**Using the Analyzer:**

```
Step 1: Navigate to "Village Analyzer" from sidebar

Step 2: View the infrastructure network on the map
        â€¢ Green nodes = Healthy (100% operational)
        â€¢ Yellow nodes = Minor impact (30-60% operational)
        â€¢ Orange nodes = Severe impact (10-30% operational)
        â€¢ Red nodes = Failed (<10% operational)

Step 3: Click any infrastructure node to trigger a failure
        â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
        â”‚ âš ï¸ Trigger Failure         âœ•    â”‚
        â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
        â”‚ Main Pump Station                â”‚
        â”‚ pump â€¢ Health: 100%              â”‚
        â”‚                                  â”‚
        â”‚ Failure Type: [Supply Disruption]â”‚
        â”‚ Severity: [Low][Medium][High]    â”‚
        â”‚                                  â”‚
        â”‚ [ðŸ’¥ Trigger Failure]             â”‚
        â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

Step 4: Watch the impact propagate
        â€¢ GNN calculates impact on connected nodes
        â€¢ Map updates with color-coded damage levels
        â€¢ InfoPanel shows detailed impact analysis

Step 5: Add more infrastructure (Optional)
        â€¢ Right-click anywhere on the map
        â€¢ Enter node name and select type
        â€¢ Node auto-connects based on proximity and type

Step 6: Trigger multiple failures to see accumulated damage
        â€¢ Each failure adds to existing damage
        â€¢ Nodes above 90% damage cascade to failure
```

### 3. Ask AI Questions

Click "Ask AI" button â†’ Modal opens:

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  ðŸ¤– Ask AI about Schemes                       âœ•   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                                     â”‚
â”‚  What water problems are reported in Zone B?       â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚                                             â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚                                          [Ask AI]  â”‚
â”‚                                                     â”‚
â”‚  ðŸ’¡ Example questions:                             â”‚
â”‚     â€¢ Why is Swachh Bharat scheme delayed?         â”‚
â”‚     â€¢ Show budget status of MGNREGA project        â”‚
â”‚     â€¢ What are citizen complaints in Zone A?       â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### 3. View Results

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Answer:                                            â”‚
â”‚  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€   â”‚
â”‚  Citizens report low water pressure in Zone B,     â”‚
â”‚  particularly during morning hours (7-9 AM).        â”‚
â”‚  Sensor data confirms 30% pressure drop.            â”‚
â”‚                                                     â”‚
â”‚  ðŸ“š Citations (2):                                  â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚ ðŸ“„ Sensor Report                      89%  â”‚   â”‚
â”‚  â”‚ "Sensor-042 recorded pressure drops..."    â”‚   â”‚
â”‚  â”‚ [Show on Map] [View Document]              â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚ ðŸ’¬ Citizen Report                     75%  â”‚   â”‚
â”‚  â”‚ "Multiple complaints from Zone B..."       â”‚   â”‚
â”‚  â”‚ [Show on Map] [View Document]              â”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚                                                     â”‚
â”‚  ðŸ” Trace ID: trace_1763664692_2300 â€¢ Cached âœ“    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### 4. Explore Citations

- **Show on Map**: Pans to citation location with highlight
- **View Document**: Opens full source document
- **Relevance Score**: Shows AI confidence (0-100%)

---

## ðŸ” Security Features

### RAG-Specific Security

| Feature | Implementation |
|---------|---------------|
| ðŸ”’ **PII Sanitization** | Auto-redacts Aadhaar, PAN, emails, phones before LLM |
| ðŸŽ« **JWT Authentication** | All RAG queries require valid user token |
| â±ï¸ **Rate Limiting** | 10 queries/minute per user to prevent abuse |
| ðŸ”‘ **Service-to-Service Auth** | Backend â†” Pathway uses PATHWAY_MCP_TOKEN |
| ðŸ“Š **Audit Logging** | Every query logged with trace_id, user, latency |
| ðŸš« **Fail-Open Policy** | Returns graceful errors if Pathway unavailable |

### Privacy Protection

```javascript
// Example: PII auto-redacted before sending to LLM
Input:  "Contact John at john@example.com, Aadhaar: 1234-5678-9012"
Output: "Contact John at [EMAIL_REDACTED], Aadhaar: [AADHAAR_REDACTED]"
```

---

## ðŸ“Š RAG API Reference

### Endpoint

```http
POST /api/rag-query
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "question": "Why is Swachh Bharat scheme delayed?",
  "scheme_id": "S-123",           // Optional: filter by scheme
  "bbox": [77.5, 28.4, 77.6, 28.5], // Optional: geographic filter
  "max_citations": 5              // Optional: limit citations (default 5)
}
```

### Response

```json
{
  "answer": "The Swachh Bharat Mission is delayed by 14 days due to monsoon weather...",
  "citations": [
    {
      "doc_id": "vendor-report-VR-2026-001",
      "type": "vendor_report",
      "snippet": "Weather delays in October pushed timeline by 3 weeks...",
      "score": 0.92,
      "timestamp": "2026-10-15T10:30:00Z",
      "geo": {
        "lat": 28.4595,
        "lon": 77.0266
      }
    },
    {
      "doc_id": "scheme-S-123",
      "type": "scheme",
      "snippet": "Phase 2 originally scheduled for October completion...",
      "score": 0.87,
      "timestamp": "2026-09-01T00:00:00Z",
      "geo": {
        "lat": 28.4612,
        "lon": 77.0312
      }
    }
  ],
  "trace_id": "trace_1763664729_8574",
  "cached": false,
  "processing_time_ms": 612
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `400` | Invalid request (missing question, malformed bbox) |
| `401` | Unauthorized (invalid/missing JWT token) |
| `429` | Rate limit exceeded (>10 queries/min) |
| `502` | RAG service temporarily unavailable |
| `500` | Internal server error |

---

## ðŸ§ª Testing the RAG Feature

### Backend Test

```bash
cd backend
powershell -File test-rag.ps1
```

Expected output:
```
=== Testing RAG Feature ===
1. Logging in...
âœ… Login successful!

2. Sending RAG query...
âœ… RAG query successful!

Answer: Multiple schemes are experiencing delays...
Citations: 2 (scores: 0.9, 0.82)
Cached: False
```

### Frontend Test

1. Open http://localhost:3000
2. Login with: `admin@village.com` / `admin123`
3. Click **"Ask AI"** button (blue gradient)
4. Type: `"Why is MGNREGA delayed?"`
5. Verify:
   - âœ… Answer appears within 1 second
   - âœ… Citations show with scores
   - âœ… "Show on Map" buttons work
   - âœ… Cached indicator on repeat query

---

## ðŸ“š Documentation

### Key Files

```
ðŸ“ Project Root
â”œâ”€â”€ ðŸ“„ README.md (this file)
â”œâ”€â”€ ðŸ“ docs/
â”‚   â””â”€â”€ ðŸ“„ README_RAG.md (detailed RAG setup)
â”œâ”€â”€ ðŸ“ backend/
â”‚   â”œâ”€â”€ ðŸ“ routes/
â”‚   â”‚   â””â”€â”€ ðŸ”§ rag.js (RAG endpoint)
â”‚   â”œâ”€â”€ ðŸ“ utils/
â”‚   â”‚   â”œâ”€â”€ ðŸ”§ pathwayClient.js (MCP client)
â”‚   â”‚   â”œâ”€â”€ ðŸ”§ piiSanitizer.js (privacy filter)
â”‚   â”‚   â””â”€â”€ ðŸ”§ ragCache.js (response cache)
â”‚   â””â”€â”€ ðŸ“„ test-rag.ps1 (test script)
â”œâ”€â”€ ðŸ“ src/
â”‚   â”œâ”€â”€ ðŸ“ components/
â”‚   â”‚   â””â”€â”€ ðŸ“ Rag/
â”‚   â”‚       â””â”€â”€ ðŸŽ¨ RagQueryModal.tsx (UI component)
â”‚   â”œâ”€â”€ ðŸ“ hooks/
â”‚   â”‚   â””â”€â”€ ðŸ”§ useRagQuery.ts (React hook)
â”‚   â””â”€â”€ ðŸ“ utils/
â”‚       â””â”€â”€ ðŸ”§ mapHighlighter.ts (map integration)
â””â”€â”€ ðŸ“ llm-app/
    â””â”€â”€ ðŸ“ templates/question_answering_rag/
        â”œâ”€â”€ ðŸ app.py (Pathway server)
        â”œâ”€â”€ ðŸ mock_pathway_server.py (dev mock)
        â””â”€â”€ ðŸ“œ setup-wsl.sh (Linux setup)
```

### Further Reading

- ðŸ“– [Pathway Documentation](https://pathway.com/developers)
- ðŸ“– [RAG Setup Guide](./docs/README_RAG.md)
- ðŸ“– [API Reference](./docs/README_RAG.md#api-endpoints)

---

## ðŸŒŸ Demo

### Screenshots

The RAG feature is integrated across the platform:

**1. Admin Dashboard**
- Click "Ask AI" in top-right corner
- Query about scheme status, delays, budget
- View citations with geo-coordinates

**2. Schemes View**
- "Ask AI" button in toolbar
- Ask about specific schemes
- Citations link to scheme details

**3. Citizen Dashboard**
- Public-facing AI assistant
- Simplified query interface
- Helps citizens track projects

---

## ðŸ¤ Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Areas for Contribution

- ðŸ§  **AI/ML**: Improve RAG accuracy, add new LLM providers
- ðŸŽ¨ **UI/UX**: Enhance modal design, add voice input
- ðŸ“Š **Analytics**: Query insights, popular questions dashboard
- ðŸŒ **i18n**: Multi-language support for queries
- ðŸ“± **Mobile**: Optimize RAG UI for mobile devices

---

## ðŸ“ License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

---

## ðŸ‘¥ Team

**Developed by**: Village Digital Twin Team  
**Contact**: abhishekmishra8770@gmail.com  
**GitHub**: [@Abhishekmishra2808](https://github.com/Abhishekmishra2808)

---

## ðŸ™ Acknowledgments

- **Pathway** - For the amazing RAG framework
- **OpenAI/Google** - For LLM APIs
- **MongoDB** - For flexible document storage
- **React Community** - For excellent UI libraries

---

<div align="center">

**â­ Star this repo if you find it useful!**

Made with â¤ï¸ for rural development

[Report Bug](https://github.com/Abhishekmishra2808/village-digital-twin/issues) â€¢ [Request Feature](https://github.com/Abhishekmishra2808/village-digital-twin/issues)

</div>

