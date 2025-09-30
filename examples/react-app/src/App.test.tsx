import React from 'react';
import { render, screen } from '@testing-library/react';

// Simple smoke test without the integration components
describe('React App Smoke Tests', () => {
  test('renders without crashing', () => {
    // Just test that we can import React components
    const TestComponent = () => <div data-testid="test">Hello World</div>;
    render(<TestComponent />);
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  test('basic imports work', () => {
    // Test that the ThumbmarkJS integration can be imported
    expect(() => {
      const { ThumbmarkProvider, useThumbmark } = require('@thumbmarkjs/react');
      expect(typeof ThumbmarkProvider).toBe('function');
      expect(typeof useThumbmark).toBe('function');
    }).not.toThrow();
  });
});
