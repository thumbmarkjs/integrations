import { Provider } from '@angular/core';
import { ThumbmarkService, ThumbmarkConfig, THUMBMARK_CONFIG } from './thumbmark.service';

/**
 * Provides ThumbmarkJS for standalone Angular applications.
 *
 * @example
 * ```ts
 * // app.config.ts
 * import { provideThumbmark } from '@thumbmarkjs/angular';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideThumbmark({ apiKey: 'your-api-key' })
 *   ]
 * };
 * ```
 */
export function provideThumbmark(config?: ThumbmarkConfig): Provider[] {
  return [
    { provide: THUMBMARK_CONFIG, useValue: config || {} },
    {
      provide: ThumbmarkService,
      useFactory: (cfg: ThumbmarkConfig) => new ThumbmarkService(cfg),
      deps: [THUMBMARK_CONFIG],
    },
  ];
}
