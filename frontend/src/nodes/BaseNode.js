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
  const color = colors[title] || "#ffffff";

  return (
    <div
      style={{
        padding: 14,
        borderRadius: 12,
        minWidth: 200,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "linear-gradient(145deg, #1a1a2e, #16213e)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        transition: "transform 0.15s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
      }}
    >
      {/* Top Accent Bar */}
      <div
        style={{
          height: 4,
          width: "100%",
          backgroundColor: color,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />

      {/* Title */}
      <div
        style={{
          fontWeight: "bold",
          fontSize: 15,
          marginBottom: 6,
        }}
      >
        {title}
      </div>

      {/* Inputs */}
      {inputs.map((id, index) => (
        <Handle
          key={id}
          type="target"
          position={Position.Left}
          id={id}
          style={{
            top: 50 + index * 20,
            backgroundColor: color,
            width: 10,
            height: 10,
          }}
        />
      ))}

      {/* Outputs */}
      {outputs.map((id, index) => (
        <Handle
          key={id}
          type="source"
          position={Position.Right}
          id={id}
          style={{
            top: 50 + index * 20,
            backgroundColor: color,
            width: 10,
            height: 10,
          }}
        />
      ))}

      {/* Content */}
      <div style={{ fontSize: 13, opacity: 0.9 }}>
        {children}
      </div>
    </div>
  );
}