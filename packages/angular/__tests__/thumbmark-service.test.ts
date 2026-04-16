import { ThumbmarkService, THUMBMARK_CONFIG } from '../src/thumbmark.service';

describe('ThumbmarkService', () => {
  it('should create an instance without config', () => {
    const service = new ThumbmarkService();
    expect(service).toBeDefined();
    expect(service.thumbmark$).toBeDefined();
    expect(service.visitorId$).toBeDefined();
    expect(service.isLoading$).toBeDefined();
    expect(service.error$).toBeDefined();
    expect(service.components$).toBeDefined();
    expect(service.info$).toBeDefined();
  });

  it('should create an instance with config', () => {
    const service = new ThumbmarkService({ apiKey: 'test-key' });
    expect(service).toBeDefined();
  });

  it('should call get() and populate observables', async () => {
    const service = new ThumbmarkService({});

    let thumbmark: string | null = null;
    let visitorId: string | null = null;
    let isLoading = true;

    service.thumbmark$.subscribe(v => thumbmark = v);
    service.visitorId$.subscribe(v => visitorId = v);
    service.isLoading$.subscribe(v => isLoading = v);

    await service.get();

    expect(thumbmark).toBe('mock-thumbmark-hash');
    expect(visitorId).toBe('mock-visitor-id');
    expect(isLoading).toBe(false);
  });

  it('should support reload()', async () => {
    const service = new ThumbmarkService({});

    let thumbmark: string | null = null;
    service.thumbmark$.subscribe(v => thumbmark = v);

    await service.reload();

    expect(thumbmark).toBe('mock-thumbmark-hash');
  });

  it('should complete subjects on destroy', () => {
    const service = new ThumbmarkService({});
    expect(() => service.destroy()).not.toThrow();
  });

  it('THUMBMARK_CONFIG should be an InjectionToken', () => {
    expect(THUMBMARK_CONFIG).toBeDefined();
  });
});
