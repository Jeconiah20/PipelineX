import { Handle, Position } from "reactflow";

// Node colors by type
const colors = {
  Input: "#FFD700",
  LLM: "#4CAF50",
  Output: "#FF5722",
  Text: "#2196F3",
  Math: "#9C27B0",
  Condition: "#FF9800",
  Delay: "#607D8B",
  APIRequest: "#009688",
  Logger: "#795548",
};

export default function BaseNode({ title, inputs = [], outputs = [], children }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        minWidth: 180,
        border: "1px solid #ccc",
        backgroundColor: colors[title] || "#fff",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        transition: "transform 0.1s, box-shadow 0.2s",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.15)";
      }}
    >
      {/* Title */}
      <div style={{ fontWeight: "bold", marginBottom: 8, fontSize: 16 }}>
        {title}
      </div>

      {/* Inputs */}
      {inputs.map((id, index) => (
        <Handle
          key={id}
          type="target"
          position={Position.Left}
          id={id}
          style={{ top: 40 + index * 20, backgroundColor: "#333" }}
        />
      ))}

      {/* Outputs */}
      {outputs.map((id, index) => (
        <Handle
          key={id}
          type="source"
          position={Position.Right}
          id={id}
          style={{ top: 40 + index * 20, backgroundColor: "#333" }}
        />
      ))}

      {/* Custom content */}
      <div style={{ marginTop: 4 }}>{children}</div>
    </div>
  );
}
