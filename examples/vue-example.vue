<template>
  <div>
    <h1>ThumbmarkJS Vue Example</h1>
    <div style="
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
      font-family: monospace;
    ">
      Using @thumbmarkjs/vue v{{ version }} • @thumbmarkjs/thumbmarkjs v{{ getVersion() }}
    </div>
    <div style="padding: 20px;">
      <div v-if="isLoading" style="padding: 20px;">
        🔄 Generating thumbmark...
      </div>
      
      <div v-else-if="error" style="padding: 20px; color: red;">
        ❌ Error: {{ error.message }}
        <button @click="reload" style="margin-top: 10px;">
          Try Again
        </button>
      </div>
      
      <div v-else style="padding: 20px;">
        <h3>Your Browser Thumbmark</h3>
        <div style="
          background-color: #f5f5f5; 
          padding: 10px; 
          font-family: monospace;
          word-break: break-all;
          margin-bottom: 10px;
        ">
          {{ thumbmark }}
        </div>
        <button @click="reload">
          🔄 Generate New Thumbmark
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThumbmark, version } from '@thumbmarkjs/vue';
import { getVersion } from '@thumbmarkjs/thumbmarkjs';

const { thumbmark, isLoading, error, reload } = useThumbmark();
</script>

<script>
// For the plugin setup, add this to your main.js:
/*
import { createApp } from 'vue';
import { createThumbmarkPlugin } from '@thumbmarkjs/vue';
import App from './App.vue';

const app = createApp(App);

app.use(createThumbmarkPlugin({
  apiKey: 'your-api-key-here', // Optional: remove for client-only fingerprinting
  options: {
    timeout: 5000,
    logging: true,
    // exclude: ['webgl'], // Uncomment to exclude specific components
  }
}));

app.mount('#app');
*/
</script>