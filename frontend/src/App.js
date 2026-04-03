import { useState, useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(220);

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarWidth(0);
      } else {
        setSidebarWidth(220);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <PipelineToolbar />
      <div
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
          transition: 'margin-left 0.3s ease, width 0.3s ease',
        }}
      >
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;