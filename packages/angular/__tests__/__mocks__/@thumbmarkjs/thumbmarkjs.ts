// Minimal ThumbmarkJS mock for unit testing
export class Thumbmark {
  constructor(options?: any) {}
  async get(): Promise<any> {
    return {
      thumbmark: 'mock-thumbmark-hash',
      visitorId: 'mock-visitor-id',
      components: {},
      info: {},
    };
  }
}

export function getVersion(): string {
  return '0.0.0-mock';
}
