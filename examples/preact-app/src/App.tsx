import './App.css';
import { ThumbmarkProvider, useThumbmark, version, getThumbmarkVersion } from '@thumbmarkjs/preact';
import { getVersion } from '@thumbmarkjs/thumbmarkjs';

// Test Component 1: No options (basic usage)
function BasicThumbmarkTest() {
  const { thumbmark, isLoading, error, components, info } = useThumbmark();

  return (
    <div class="test-section">
      <h2>Test 1: Basic Usage (No Options)</h2>
      {isLoading && <div data-testid="basic-loading">Loading...</div>}
      {error && <div data-testid="basic-error" class="error">Error: {error.message}</div>}
      {thumbmark && (
        <div>
          <div data-testid="basic-thumbmark" class="thumbmark">Thumbmark: {thumbmark}</div>
          {components && (
            <div data-testid="basic-components">
              Components keys: {Object.keys(components).join(', ')}
            </div>
          )}
          {info && (
            <div data-testid="basic-info">
              Info keys: {Object.keys(info).join(', ')}
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
    <div class="test-section">
      <h2>Test 2: With API Key</h2>
      {isLoading && <div data-testid="apikey-loading">Loading...</div>}
      {error && <div data-testid="apikey-error" class="error">Error: {error.message}</div>}
      {thumbmark && (
        <div>
          <div data-testid="apikey-thumbmark" class="thumbmark">Thumbmark: {thumbmark}</div>
          {components && (
            <div data-testid="apikey-components">
              Components keys: {Object.keys(components).join(', ')}
            </div>
          )}
          {info && (
            <div data-testid="apikey-info">
              Info keys: {Object.keys(info).join(', ')}
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
    <div class="test-section">
      <h2>Test 3: With Options</h2>
      {isLoading && <div data-testid="options-loading">Loading...</div>}
      {error && <div data-testid="options-error" class="error">Error: {error.message}</div>}
      {thumbmark && (
        <div>
          <div data-testid="options-thumbmark" class="thumbmark">Thumbmark: {thumbmark}</div>
          {components && (
            <div data-testid="options-components">
              Components keys: {Object.keys(components).join(', ')}
            </div>
          )}
          {info && (
            <div data-testid="options-info">
              Info keys: {Object.keys(info).join(', ')}
            </div>
          )}
          <button data-testid="options-reload" onClick={reload}>Reload</button>
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <div class="App">
      <header class="App-header">
        <h1>ThumbmarkJS Preact Integration Tests</h1>
        <div class="version-info">
          Using @thumbmarkjs/preact v{version} v{getThumbmarkVersion()} and
          @thumbmarkjs/thumbmarkjs v{getVersion()}
        </div>
      </header>

      {/* Test 1: Basic usage - no options or API key */}
      <ThumbmarkProvider>
        <BasicThumbmarkTest />
      </ThumbmarkProvider>

      {/* Test 2: With API key */}
      <ThumbmarkProvider
        apiKey={import.meta.env.VITE_THUMBMARK_API_KEY}>
        <ApiKeyThumbmarkTest />
      </ThumbmarkProvider>

      {/* Test 3: With custom options */}
      <ThumbmarkProvider
        apiKey={import.meta.env.VITE_THUMBMARK_API_KEY}
        options={{
          timeout: 3000,
          exclude: ['webgl'],
          cache_api_call: false
        }}
      >
        <OptionsThumbmarkTest />
      </ThumbmarkProvider>
    </div>
  );
}
