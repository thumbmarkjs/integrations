# ThumbmarkJS Framework Integrations

Framework-specific integrations for [ThumbmarkJS](https://github.com/thumbmarkjs/thumbmarkjs), the world's best **free** browser fingerprinting JavaScript library.

## Available Packages

- [@thumbmarkjs/react](#react) - React integration
- [@thumbmarkjs/vue](#vue) - Vue 3 integration

## Installation

All packages require the core ThumbmarkJS library as a peer dependency:

```bash
# Install the core library
npm install @thumbmarkjs/thumbmarkjs

# Install the framework integration
npm install @thumbmarkjs/react
# or
npm install @thumbmarkjs/vue
```

---

## React

### Installation

```bash
npm install @thumbmarkjs/thumbmarkjs @thumbmarkjs/react
```

### Basic Usage

```jsx
import React from 'react';
import { ThumbmarkProvider, useThumbmark } from '@thumbmarkjs/react';

// Wrap your app with ThumbmarkProvider
function App() {
  return (
    <ThumbmarkProvider>
      <MyComponent />
    </ThumbmarkProvider>
  );
}

// Use the hook in your components
function MyComponent() {
  const { thumbmark, isLoading, error } = useThumbmark();

  if (isLoading) return <div>Generating thumbmark...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Your Thumbmark:</h3>
      <code>{thumbmark}</code>
    </div>
  );
}
```

### With API Key

```jsx
import React from 'react';
import { ThumbmarkProvider, useThumbmark } from '@thumbmarkjs/react';

function App() {
  return (
    <ThumbmarkProvider apiKey="your-api-key-here">
      <MyComponent />
    </ThumbmarkProvider>
  );
}
```

### With Custom Options

```jsx
import React from 'react';
import { ThumbmarkProvider, useThumbmark } from '@thumbmarkjs/react';

function App() {
  const options = {
    timeout: 3000,
    exclude: ['webgl'],
    logging: false
  };

  return (
    <ThumbmarkProvider apiKey="your-api-key" options={options}>
      <MyComponent />
    </ThumbmarkProvider>
  );
}
```

### useThumbmark Hook

The `useThumbmark` hook returns:

- `thumbmark: string | null` - The generated thumbmark
- `isLoading: boolean` - Loading state
- `error: Error | null` - Any error that occurred
- `reload: () => Promise<void>` - Function to regenerate the thumbmark

```jsx
function MyComponent() {
  const { thumbmark, isLoading, error, reload } = useThumbmark();

  return (
    <div>
      <button onClick={reload} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Regenerate Thumbmark'}
      </button>
      {thumbmark && <p>Thumbmark: {thumbmark}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

---

## Vue

### Installation

```bash
npm install @thumbmarkjs/thumbmarkjs @thumbmarkjs/vue
```

### Basic Usage

```vue
<template>
  <div>
    <div v-if="isLoading">Generating thumbmark...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <h3>Your Thumbmark:</h3>
      <code>{{ thumbmark }}</code>
    </div>
  </div>
</template>

<script setup>
import { useThumbmark } from '@thumbmarkjs/vue';

const { thumbmark, isLoading, error } = useThumbmark();
</script>
```

### Plugin Setup

```javascript
// main.js
import { createApp } from 'vue';
import { createThumbmarkPlugin } from '@thumbmarkjs/vue';
import App from './App.vue';

const app = createApp(App);

// Basic setup
app.use(createThumbmarkPlugin());

// With API key
app.use(createThumbmarkPlugin({
  apiKey: 'your-api-key-here'
}));

// With custom options
app.use(createThumbmarkPlugin({
  apiKey: 'your-api-key',
  options: {
    timeout: 3000,
    exclude: ['webgl'],
    logging: false
  }
}));

app.mount('#app');
```

### useThumbmark Composable

```vue
<template>
  <div>
    <button @click="reload" :disabled="isLoading">
      {{ isLoading ? 'Generating...' : 'Regenerate Thumbmark' }}
    </button>
    <p v-if="thumbmark">Thumbmark: {{ thumbmark }}</p>
    <p v-if="error">Error: {{ error.message }}</p>
  </div>
</template>

<script setup>
import { useThumbmark } from '@thumbmarkjs/vue';

const { thumbmark, isLoading, error, reload } = useThumbmark();
</script>
```

---

## Configuration Options

Both React and Vue integrations accept the same configuration options as the core ThumbmarkJS library:

| Option | Type | Description |
|--------|------|-------------|
| `apiKey` | `string` | Your ThumbmarkJS API key for enhanced uniqueness |
| `exclude` | `string[]` | Components to exclude from fingerprinting |
| `include` | `string[]` | Only include specific components |
| `timeout` | `number` | Timeout in milliseconds (default: 5000) |
| `logging` | `boolean` | Enable/disable logging (default: true) |
| `cache_api_call` | `boolean` | Cache API responses (default: false) |
| `performance` | `boolean` | Include performance metrics (default: false) |

For complete documentation of options, see the [ThumbmarkJS documentation](https://github.com/thumbmarkjs/thumbmarkjs).

## TypeScript Support

Both packages include full TypeScript support with proper type definitions.

## Examples

Check out the `/examples` directory for complete working examples with different frameworks and configurations.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT License - see the [LICENSE](LICENSE) file for details.