<script setup lang="ts">
import { version, getThumbmarkVersion, useThumbmark } from '@thumbmarkjs/vue'
import { getVersion } from '@thumbmarkjs/thumbmarkjs'

const { thumbmark, visitorId, isLoading, error, reload, components, info } = useThumbmark()

const validApiKey = import.meta.env.VITE_THUMBMARK_API_KEY
const invalidApiKey = import.meta.env.VITE_INVALID_THUMBMARK_API_KEY
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>ThumbmarkJS Vue Integration Tests</h1>
      <div class="version-info">
        Using @thumbmarkjs/vue v{{ version }} v{{ getThumbmarkVersion() }} @thumbmarkjs/thumbmarkjs v{{ getVersion() }}
      </div>
    </header>
    
    <main>
      <div class="tests-overview">
        <h2>ThumbmarkJS Vue Integration Tests</h2>
        <p>This page shows the current configuration working with a valid API key.</p>
        <p><strong>API Key:</strong> {{ validApiKey || 'Not configured' }}</p>

        <!-- Current Configuration Test -->
        <div class="test-section">
          <h3>✅ Current Configuration (Valid API Key)</h3>
          <div v-if="isLoading" class="loading">🔄 Loading...</div>
          <div v-else-if="error" class="error">❌ Error: {{ error.message }}</div>
          <div v-else-if="thumbmark" class="success">
            <div><strong>✅ Visitor ID:</strong> {{ visitorId || 'Not available' }}</div>
            <div><strong>✅ Thumbmark:</strong> {{ thumbmark }}</div>
            <div v-if="components"><strong>📦 Components keys:</strong> {{ Object.keys(components).join(', ') }}</div>
            <div v-if="info"><strong>ℹ️ Info keys:</strong> {{ Object.keys(info).join(', ') }}</div>
          </div>
          <div v-else class="waiting">⏳ Waiting for thumbmark...</div>

          <button @click="reload" :disabled="isLoading">
            {{ isLoading ? 'Loading...' : 'Reload Thumbmark' }}
          </button>
        </div>

        <!-- Instructions for Other Tests -->
        <div class="instructions">
          <h3>Testing Other Configurations</h3>
          <p>To test different configurations, modify the <code>main.ts</code> file and restart the dev server:</p>

          <div class="config-examples">
            <div class="config-example">
              <h4>🚫 No API Key:</h4>
              <pre><code>app.use(createThumbmarkPlugin())</code></pre>
            </div>

            <div class="config-example">
              <h4>❌ Invalid API Key:</h4>
              <pre><code>app.use(createThumbmarkPlugin({
  apiKey: 'invalid-key-12345'
}))</code></pre>
            </div>

            <div class="config-example">
              <h4>⚙️ Custom Options:</h4>
              <pre><code>app.use(createThumbmarkPlugin({
  apiKey: 'your-key',
  options: {
    timeout: 3000,
    exclude: ['webgl'],
    logging: true
  }
}))</code></pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.app-header {
  background-color: #2c3e50;
  padding: 20px;
  color: white;
  margin-bottom: 30px;
}

.app-header h1 {
  margin: 0;
}

.version-info {
  font-size: 14px;
  color: #3498db;
  margin-top: 10px;
  font-family: monospace;
}

.tests-overview {
  margin: 20px 0;
}

.test-section {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  background-color: #f9f9f9;
  text-align: center;
}

.instructions {
  margin-top: 40px;
  text-align: left;
}

.config-examples {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;
}

@media (min-width: 768px) {
  .config-examples {
    grid-template-columns: 1fr 1fr;
  }
}

.config-example {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #f8f9fa;
}

.config-example h4 {
  margin-top: 0;
  color: #333;
}

.config-example pre {
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 14px;
  margin: 10px 0 0 0;
}

.config-example code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.loading, .error, .success, .waiting {
  margin: 15px 0;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
}

.loading {
  background-color: #e3f2fd;
  color: #1976d2;
}

.error {
  background-color: #ffebee;
  color: #c62828;
}

.success {
  background-color: #e8f5e8;
  color: #2e7d32;
  font-family: monospace;
  word-break: break-all;
}

.waiting {
  background-color: #fff3e0;
  color: #f57c00;
}

button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #1976d2;
}
</style>
