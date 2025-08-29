import React from 'react';
import { ThumbmarkProvider, useThumbmark } from '@thumbmarkjs/react';

// Example component using the thumbmark hook
function ThumbmarkDisplay() {
  const { thumbmark, isLoading, error, reload } = useThumbmark();

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <div>🔄 Generating thumbmark...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <div>❌ Error: {error.message}</div>
        <button onClick={reload} style={{ marginTop: '10px' }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Your Browser Thumbmark</h3>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '10px', 
        fontFamily: 'monospace',
        wordBreak: 'break-all',
        marginBottom: '10px'
      }}>
        {thumbmark}
      </div>
      <button onClick={reload}>
        🔄 Generate New Thumbmark
      </button>
    </div>
  );
}

// Main App component
function App() {
  return (
    <ThumbmarkProvider 
      apiKey="your-api-key-here" // Optional: remove for client-only fingerprinting
      options={{
        timeout: 5000,
        logging: true,
        // exclude: ['webgl'], // Uncomment to exclude specific components
      }}
    >
      <div>
        <h1>ThumbmarkJS React Example</h1>
        <ThumbmarkDisplay />
      </div>
    </ThumbmarkProvider>
  );
}

export default App;