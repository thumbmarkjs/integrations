# @thumbmarkjs/react

React integration for ThumbmarkJS - browser fingerprinting library.

## Installation

```bash
npm install @thumbmarkjs/thumbmarkjs @thumbmarkjs/react
```

## Usage

### 1. Wrap your app or a specific component

```jsx
import { ThumbmarkProvider } from '@thumbmarkjs/react';

function App() {
  return (
    <ThumbmarkProvider>
      <MyComponent />
    </ThumbmarkProvider>
  );
}
```

### 2. Use the hook

```jsx
import { useThumbmark } from '@thumbmarkjs/react';

function MyComponent() {
  const { thumbmark, visitorId, isLoading } = useThumbmark();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>Visitor ID: {visitorId}</div>
      <div>Thumbmark: {thumbmark}</div>
    </div>
  );
}
```

### With API Key

```jsx
<ThumbmarkProvider apiKey="your-key">
  <MyComponent />
</ThumbmarkProvider>
```

### With Options

```jsx
<ThumbmarkProvider
  apiKey="your-key"
  options={{
    timeout: 3000,
    exclude: ['webgl']
  }}
>
  <MyComponent />
</ThumbmarkProvider>
```

That's it! See [ThumbmarkJS docs](https://github.com/thumbmarkjs/thumbmarkjs) for configuration options.

## License

MIT License - see the [LICENSE](../../LICENSE) file for details.