import * as VueIntegration from '../src';

describe('Vue package exports', () => {
  it('should export createThumbmarkPlugin', () => {
    expect(VueIntegration.createThumbmarkPlugin).toBeDefined();
    expect(typeof VueIntegration.createThumbmarkPlugin).toBe('function');
  });

  it('should export useThumbmark composable', () => {
    expect(VueIntegration.useThumbmark).toBeDefined();
    expect(typeof VueIntegration.useThumbmark).toBe('function');
  });

  it('should export all expected modules', () => {
    const exports = Object.keys(VueIntegration);
    expect(exports).toContain('createThumbmarkPlugin');
    expect(exports).toContain('useThumbmark');
  });
});