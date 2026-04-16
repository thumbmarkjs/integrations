import * as PreactIntegration from '../src';

describe('Preact package exports', () => {
  it('should export ThumbmarkProvider', () => {
    expect(PreactIntegration.ThumbmarkProvider).toBeDefined();
    expect(typeof PreactIntegration.ThumbmarkProvider).toBe('function');
  });

  it('should export useThumbmark hook', () => {
    expect(PreactIntegration.useThumbmark).toBeDefined();
    expect(typeof PreactIntegration.useThumbmark).toBe('function');
  });

  it('should export all expected modules', () => {
    const exports = Object.keys(PreactIntegration);
    expect(exports).toContain('ThumbmarkProvider');
    expect(exports).toContain('useThumbmark');
  });
});
