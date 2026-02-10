from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS so frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow your frontend origin if needed
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# POST endpoint
@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Build graph
    G = nx.DiGraph()
    for node in pipeline.nodes:
        G.add_node(node.id)
    for edge in pipeline.edges:
        G.add_edge(edge.source, edge.target)

    # Check if DAG
    is_dag = nx.is_directed_acyclic_graph(G)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
