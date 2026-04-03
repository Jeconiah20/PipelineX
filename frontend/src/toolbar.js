import { useState } from 'react';
import { DraggableNode } from './draggableNode';

// Node categories with icons
const nodeCategories = {
  "📥 Input/Output": [
    { type: 'customInput', label: 'Input' },
    { type: 'customOutput', label: 'Output' },
    { type: 'text', label: 'Text' },
  ],
  "🧠 Logic": [
    { type: 'llm', label: 'LLM' },
    { type: 'condition', label: 'Condition' },
    { type: 'math', label: 'Math' },
  ],
  "🔧 Utility": [
    { type: 'delay', label: 'Delay' },
    { type: 'apiRequest', label: 'API Request' },
    { type: 'logger', label: 'Logger' },
  ],
};

export const PipelineToolbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(
    Object.keys(nodeCategories).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

  // Toggle category expand/collapse
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Filter nodes based on search
  const filterNodes = (nodes) => {
    if (!searchTerm) return nodes;
    return nodes.filter((node) =>
      node.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <>
      {/* Collapse/Expand Button (visible on small screens) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: 'fixed',
          top: 10,
          left: isCollapsed ? 10 : 230,
          zIndex: 200,
          backgroundColor: '#0f3460',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 14px',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          transition: 'left 0.3s ease',
        }}
      >
        {isCollapsed ? '☰' : '✕'}
      </button>

      {/* Sidebar */}
      <div
        style={{
          width: '220px',
          height: '100vh',
          backgroundColor: '#1a1a2e',
          padding: '16px',
          boxSizing: 'border-box',
          position: 'fixed',
          left: isCollapsed ? '-220px' : 0,
          top: 0,
          overflowY: 'auto',
          boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
          zIndex: 100,
          transition: 'left 0.3s ease',
        }}
      >
        {/* Title */}
        <h2
          style={{
            color: '#fff',
            fontSize: '20px',
            marginBottom: '16px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          🧩 PipelineX
        </h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search nodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            marginBottom: '16px',
            boxSizing: 'border-box',
            fontSize: '14px',
            backgroundColor: '#16213e',
            color: '#fff',
          }}
        />

        {/* Categories */}
        {Object.entries(nodeCategories).map(([category, nodes]) => {
          const filteredNodes = filterNodes(nodes);
          if (filteredNodes.length === 0) return null;

          return (
            <div key={category} style={{ marginBottom: '12px' }}>
              {/* Category Header */}
              <div
                onClick={() => toggleCategory(category)}
                style={{
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  padding: '8px',
                  backgroundColor: '#0f3460',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  userSelect: 'none',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a4a7a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0f3460';
                }}
              >
                <span>{category}</span>
                <span>{expandedCategories[category] ? '▼' : '▶'}</span>
              </div>

              {/* Nodes in Category */}
              {expandedCategories[category] && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginTop: '8px',
                    paddingLeft: '8px',
                  }}
                >
                  {filteredNodes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};