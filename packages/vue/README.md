# @thumbmarkjs/vue

Vue 3 integration for ThumbmarkJS - browser fingerprinting library.



## Installation

```bash
npm install @thumbmarkjs/thumbmarkjs @thumbmarkjs/vue
```

## Usage

### 1. Install the plugin

```javascript
import { createApp } from 'vue';
import { createThumbmarkPlugin } from '@thumbmarkjs/vue';

const app = createApp(App);
app.use(createThumbmarkPlugin());
app.mount('#app');
```

### 2. Use the composable

```vue
<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div>Visitor ID: {{ visitorId }}</div>
      <div>Thumbmark: {{ thumbmark }}</div>
    </div>
  </div>
</template>

<script setup>
import { useThumbmark } from '@thumbmarkjs/vue';

const { thumbmark, visitorId, isLoading } = useThumbmark();
</script>
```

### With API Key

```javascript
app.use(createThumbmarkPlugin({
  apiKey: 'your-key'
}));
```

### With Options

```javascript
app.use(createThumbmarkPlugin({
  apiKey: 'your-key',
  options: {
    timeout: 3000,
    exclude: ['webgl']
  }
}));
```

That's it! See [ThumbmarkJS docs](https://github.com/thumbmarkjs/thumbmarkjs) for configuration options.

## License

MIT License - see the [LICENSE](../../LICENSE) file for details.