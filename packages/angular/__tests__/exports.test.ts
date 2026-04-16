import * as AngularIntegration from '../src';

describe('Angular package exports', () => {
  it('should export ThumbmarkService', () => {
    expect(AngularIntegration.ThumbmarkService).toBeDefined();
  });

  it('should export provideThumbmark', () => {
    expect(AngularIntegration.provideThumbmark).toBeDefined();
    expect(typeof AngularIntegration.provideThumbmark).toBe('function');
  });

  it('should export THUMBMARK_CONFIG injection token', () => {
    expect(AngularIntegration.THUMBMARK_CONFIG).toBeDefined();
  });

  it('should export all expected modules', () => {
    const exports = Object.keys(AngularIntegration);
    expect(exports).toContain('ThumbmarkService');
    expect(exports).toContain('provideThumbmark');
    expect(exports).toContain('THUMBMARK_CONFIG');
  });
});
