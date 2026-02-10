# PipelineX — Visual Pipeline Builder

An interactive, drag-and-drop visual pipeline builder where users can create, connect, and configure workflow nodes. The backend validates whether the pipeline forms a valid **DAG (Directed Acyclic Graph)** before execution.

---

## Live Demo

- **Frontend:** [https://piplinex-frontend.netlify.app](https://piplinex-frontend.netlify.app)
- **Backend API:** [https://pipelinex-api.onrender.com/docs](https://pipelinex-api.onrender.com/docs)

---

## Features

- Drag-and-drop node placement on canvas
- Visual node connections with typed input/output handles
- 10 configurable node types

| Node | Description |
|------|------------|
| **Input Node** | Pipeline entry point — accepts initial data |
| **Output Node** | Pipeline exit point — delivers final result |
| **LLM Node** | Language model processing node |
| **Text Node** | Text transformation and manipulation |
| **API Request Node** | HTTP request handling (GET/POST) |
| **Condition Node** | Branching logic — if/else routing |
| **Delay Node** | Async timing and delay control |
| **Logger Node** | Debug logging and monitoring |
| **Math Node** | Mathematical operations and calculations |
| **Base Node** | Reusable abstraction for all node types |

- Reusable BaseNode abstraction — reduces code duplication across all nodes
- Backend DAG validation — verifies pipeline structure before execution
- Pipeline analysis — counts nodes, edges, and validates graph structure

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Flow |
| Backend | FastAPI (Python) |
| Validation | DAG detection, topological analysis |
| Deployment | Netlify (frontend), Render (backend) |

---

## Architecture

The application follows a client-server architecture where the React frontend handles the visual pipeline building experience and sends the pipeline data to the FastAPI backend for structural validation.

**Frontend Flow:**
1. User drags nodes from the toolbar onto the canvas
2. User connects nodes by linking input/output handles
3. User clicks submit to validate the pipeline

**Backend Flow:**
1. Receives pipeline data (nodes and edges) via POST request
2. Counts total nodes and edges
3. Validates whether the graph forms a valid DAG (no circular dependencies)
4. Returns analysis result

---

## Project Structure
PipelineX/
├── frontend/
│ ├── src/
│ │ ├── nodes/
│ │ │ ├── BaseNode.js
│ │ │ ├── inputNode.js
│ │ │ ├── outputNode.js
│ │ │ ├── llmNode.js
│ │ │ ├── textNode.js
│ │ │ ├── APIRequestNode.js
│ │ │ ├── ConditionNode.js
│ │ │ ├── DelayNode.js
│ │ │ ├── LoggerNode.js
│ │ │ └── MathNode.js
│ │ ├── App.js
│ │ ├── store.js
│ │ ├── submit.js
│ │ ├── toolbar.js
│ │ ├── draggableNode.js
│ │ └── ui.js
│ ├── public/
│ └── package.json
│
├── backend/
│ ├── main.py
│ └── requirements.txt
│
├── .gitignore
└── README.md


---

## Local Development Setup

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)

### Frontend and Backend

```bash
cd frontend
npm install
npm start
The frontend runs on http://localhost:3000

cd backend
pip install -r requirements.txt
uvicorn main:app --reload
The backend runs on http://localhost:8000

## Key Technical Decisions

| Decision | Reasoning |
|----------|-----------|
| BaseNode abstraction | All 10 node types extend BaseNode — reduces approximately 60% code duplication and makes adding new nodes trivial |
| React Flow | Industry-standard library for node-based UIs — handles canvas, zooming, panning, and edge rendering |
| FastAPI | Lightweight Python framework — ideal for quick API validation with automatic Swagger documentation |
| DAG validation | Ensures pipeline has no circular dependencies — critical for any execution engine |




