import { useState } from "react";
import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      setPopup({
        success: true,
        message: data,
      });
    } catch (error) {
      console.error(error);
      setPopup({
        success: false,
        message: "Error submitting pipeline",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Submit Button */}
      <div
        style={{
  position: "fixed",
  bottom: 30,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
}}
      >
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "14px 28px",
            backgroundColor: loading ? "#555" : "#4CAF50",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "12px",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading
              ? "0 4px 15px rgba(0,0,0,0.3)"
              : "0 4px 20px rgba(76, 175, 80, 0.5)",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(76, 175, 80, 0.6)";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(76, 175, 80, 0.5)";
            }
          }}
        >
          {loading ? (
            <>
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  border: "3px solid #fff",
                  borderTop: "3px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              Submitting...
            </>
          ) : (
            <>
              🚀 Submit Pipeline
            </>
          )}
        </button>
      </div>

      {/* Popup Overlay */}
      {popup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            animation: "fadeIn 0.2s ease",
          }}
          onClick={() => setPopup(null)}
        >
          <div
            style={{
              backgroundColor: "#1a1a2e",
              borderRadius: "16px",
              padding: "32px",
              minWidth: "320px",
              maxWidth: "90%",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              color: "#fff",
              fontFamily: "Arial, sans-serif",
              animation: "slideUp 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <h2
              style={{
                marginTop: 0,
                fontSize: "22px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: popup.success ? "#4CAF50" : "#FF5722",
              }}
            >
              {popup.success ? "✅ Pipeline Results" : "❌ Error"}
            </h2>

            {/* Divider */}
            <div
              style={{
                height: "2px",
                backgroundColor: popup.success ? "#4CAF50" : "#FF5722",
                marginBottom: "20px",
                borderRadius: "2px",
              }}
            />

            {/* Content */}
            {popup.success ? (
              <div style={{ fontSize: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid #2a2f3a",
                  }}
                >
                  <span>📊 Nodes</span>
                  <strong>{popup.message.num_nodes}</strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid #2a2f3a",
                  }}
                >
                  <span>🔗 Edges</span>
                  <strong>{popup.message.num_edges}</strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                  }}
                >
                  <span>{popup.message.is_dag ? "✅" : "❌"} Is DAG</span>
                  <strong
                    style={{
                      color: popup.message.is_dag ? "#4CAF50" : "#FF5722",
                    }}
                  >
                    {popup.message.is_dag ? "Yes" : "No"}
                  </strong>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: "16px", color: "#FF5722" }}>{popup.message}</p>
            )}

            {/* Close Button */}
            <button
              onClick={() => setPopup(null)}
              style={{
                marginTop: "24px",
                padding: "12px 24px",
                backgroundColor: "#0f3460",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "bold",
                width: "100%",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1a4a7a";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0f3460";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};