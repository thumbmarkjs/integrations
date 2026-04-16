import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Thumbmark, type ThumbmarkResponse } from '@thumbmarkjs/thumbmarkjs';

export interface ThumbmarkConfig {
  apiKey?: string;
  options?: ConstructorParameters<typeof Thumbmark>[0];
}

export const THUMBMARK_CONFIG = new InjectionToken<ThumbmarkConfig>('THUMBMARK_CONFIG');

export class ThumbmarkService {
  private thumbmarkInstance: Thumbmark | null = null;

  private thumbmarkSubject = new BehaviorSubject<string | null>(null);
  private visitorIdSubject = new BehaviorSubject<string | null>(null);
  private componentsSubject = new BehaviorSubject<ThumbmarkResponse['components'] | null>(null);
  private infoSubject = new BehaviorSubject<ThumbmarkResponse['info'] | null>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<Error | null>(null);

  readonly thumbmark$: Observable<string | null> = this.thumbmarkSubject.asObservable();
  readonly visitorId$: Observable<string | null> = this.visitorIdSubject.asObservable();
  readonly components$: Observable<ThumbmarkResponse['components'] | null> = this.componentsSubject.asObservable();
  readonly info$: Observable<ThumbmarkResponse['info'] | null> = this.infoSubject.asObservable();
  readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  readonly error$: Observable<Error | null> = this.errorSubject.asObservable();

  constructor(config?: ThumbmarkConfig) {
    if (typeof window !== 'undefined') {
      const options = config?.apiKey
        ? { ...config?.options, api_key: config.apiKey }
        : config?.options || {};
      this.thumbmarkInstance = new Thumbmark(options);
      this.get();
    }
  }

  async get(): Promise<void> {
    if (typeof window === 'undefined') return;

    if (!this.thumbmarkInstance) {
      this.errorSubject.next(new Error('ThumbmarkJS not initialized. Ensure provideThumbmark() is configured.'));
      return;
    }

    this.isLoadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      const result = await this.thumbmarkInstance.get();
      this.thumbmarkSubject.next(result.thumbmark);
      this.visitorIdSubject.next(result.visitorId || null);
      this.componentsSubject.next(result.components || null);
      this.infoSubject.next(result.info || null);
    } catch (err) {
      this.errorSubject.next(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      this.isLoadingSubject.next(false);
    }
  }

  async reload(): Promise<void> {
    await this.get();
  }

  destroy(): void {
    this.thumbmarkSubject.complete();
    this.visitorIdSubject.complete();
    this.componentsSubject.complete();
    this.infoSubject.complete();
    this.isLoadingSubject.complete();
    this.errorSubject.complete();
  }
}
