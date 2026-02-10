import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      alert(
        `Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`
      );
    } catch (error) {
      console.error(error);
      alert("Error submitting pipeline");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        bottom: 20,
        zIndex: 1000,
      }}
    >
      <button
        onClick={handleSubmit}
        style={{
          padding: "12px 24px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          transition: "transform 0.1s, background-color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.backgroundColor = "#45a049";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "#4CAF50";
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
