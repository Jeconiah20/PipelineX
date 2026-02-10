export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={(e) => (e.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: 80,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: 8,
        backgroundColor: "#1C2536",
        color: "#fff",
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        transition: "transform 0.1s, background-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.backgroundColor = "#273349";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.backgroundColor = "#1C2536";
      }}
      draggable
    >
      {label}
    </div>
  );
};
