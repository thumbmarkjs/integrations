import * as ReactIntegration from '../src';

describe('React package exports', () => {
  it('should export ThumbmarkProvider', () => {
    expect(ReactIntegration.ThumbmarkProvider).toBeDefined();
    expect(typeof ReactIntegration.ThumbmarkProvider).toBe('function');
  });

  it('should export useThumbmark hook', () => {
    expect(ReactIntegration.useThumbmark).toBeDefined();
    expect(typeof ReactIntegration.useThumbmark).toBe('function');
  });

  it('should export all expected modules', () => {
    const exports = Object.keys(ReactIntegration);
    expect(exports).toContain('ThumbmarkProvider');
    expect(exports).toContain('useThumbmark');
  });
});