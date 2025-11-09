import React from 'react';
import './App.css';
import { ThumbmarkProvider, useThumbmark, version, getThumbmarkVersion } from '@thumbmarkjs/react';
import { getVersion } from '@thumbmarkjs/thumbmarkjs';

// Test Component 1: No options (basic usage)
function BasicThumbmarkTest() {
  const { thumbmark, isLoading, error, components, info } = useThumbmark();

  return (
    <div className="test-section">
      <h2>Test 1: Basic Usage (No Options)</h2>
      {isLoading && <div data-testid="basic-loading">🔄 Loading...</div>}
      {error && <div data-testid="basic-error" className="error">❌ Error: {error.message}</div>}
      {thumbmark && (
        <div>
          <div data-testid="basic-thumbmark" className="thumbmark">✅ Thumbmark: {thumbmark}</div>
          {components && (
            <div data-testid="basic-components">
              📦 Components keys: {Object.keys(components).join(', ')}
            </div>
          )}
          {info && (
            <div data-testid="basic-info">
              ℹ️ Info keys: {Object.keys(info).join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Test Component 2: With API Key
function ApiKeyThumbmarkTest() {
  const { thumbmark, isLoading, error, components, info } = useThumbmark();

  return (
    <div className="test-section">
      <h2>Test 2: With API Key</h2>
      {isLoading && <div data-testid="apikey-loading">🔄 Loading...</div>}
      {error && <div data-testid="apikey-error" className="error">❌ Error: {error.message}</div>}
      {thumbmark && (
        <div>
          <div data-testid="apikey-thumbmark" className="thumbmark">✅ Thumbmark: {thumbmark}</div>
          {components && (
            <div data-testid="apikey-components">
              📦 Components keys: {Object.keys(components).join(', ')}
            </div>
          )}
          {info && (
            <div data-testid="apikey-info">
              ℹ️ Info keys: {Object.keys(info).join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Test Component 3: With Options
function OptionsThumbmarkTest() {
  const { thumbmark, isLoading, error, reload, components, info } = useThumbmark();

  return (
    <div className="test-section">
      <h2>Test 3: With Options</h2>
      {isLoading && <div data-testid="options-loading">🔄 Loading...</div>}
      {error && <div data-testid="options-error" className="error">❌ Error: {error.message}</div>}
      {thumbmark && (
        <div>
          <div data-testid="options-thumbmark" className="thumbmark">✅ Thumbmark: {thumbmark}</div>
          {components && (
            <div data-testid="options-components">
              📦 Components keys: {Object.keys(components).join(', ')}
            </div>
          )}
          {info && (
            <div data-testid="options-info">
              ℹ️ Info keys: {Object.keys(info).join(', ')}
            </div>
          )}
          <button data-testid="options-reload" onClick={reload}>🔄 Reload</button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ThumbmarkJS React Integration Tests</h1>
        <div className="version-info">
          Using @thumbmarkjs/react v{version} v{getThumbmarkVersion()} and
          @thumbmarkjs/thumbmarkjs v{getVersion()}

        </div>
      </header>
      
      {/* Test 1: Basic usage - no options or API key */}
      <ThumbmarkProvider>
        <BasicThumbmarkTest />
      </ThumbmarkProvider>

      {/* Test 2: With API key */}
      <ThumbmarkProvider
        apiKey={process.env.REACT_APP_THUMBMARK_API_KEY}>
        <ApiKeyThumbmarkTest />
      </ThumbmarkProvider>

      {/* Test 3: With custom options */}
      <ThumbmarkProvider 
        apiKey={process.env.REACT_APP_THUMBMARK_API_KEY}
        options={{
          timeout: 3000,
          exclude: ['webgl'],
        }}
      >
        <OptionsThumbmarkTest />
      </ThumbmarkProvider>
    </div>
  );
}

export default App;
