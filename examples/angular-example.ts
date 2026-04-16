// Example Angular component using ThumbmarkJS
//
// Setup (standalone app):
//
// ```ts
// // app.config.ts
// import { provideThumbmark } from '@thumbmarkjs/angular';
//
// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideThumbmark({ apiKey: 'your-api-key' })
//   ]
// };
// ```
//
// Setup (NgModule app):
//
// ```ts
// // app.module.ts
// import { ThumbmarkModule } from '@thumbmarkjs/angular';
//
// @NgModule({
//   imports: [
//     ThumbmarkModule.forRoot({ apiKey: 'your-api-key' })
//   ]
// })
// export class AppModule {}
// ```

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThumbmarkService, version } from '@thumbmarkjs/angular';
import { getVersion } from '@thumbmarkjs/thumbmarkjs';

@Component({
  selector: 'app-thumbmark-example',
  standalone: true,
  template: `
    <div>
      <h1>ThumbmarkJS Angular Example</h1>
      <div style="font-size: 14px; color: #666; margin-bottom: 20px; font-family: monospace;">
        Using @thumbmarkjs/angular v{{ version }} &bull; @thumbmarkjs/thumbmarkjs v{{ tmVersion }}
      </div>

      <div style="padding: 20px;">
        <div *ngIf="isLoading" style="padding: 20px;">
          Generating thumbmark...
        </div>

        <div *ngIf="error && !isLoading" style="padding: 20px; color: red;">
          Error: {{ error.message }}
          <button (click)="reload()" style="margin-top: 10px;">
            Try Again
          </button>
        </div>

        <div *ngIf="!isLoading && !error" style="padding: 20px;">
          <h3>Your Browser Thumbmark</h3>
          <div style="background-color: #f5f5f5; padding: 10px; font-family: monospace; word-break: break-all; margin-bottom: 10px;">
            {{ thumbmark }}
          </div>
          <div *ngIf="visitorId">
            <strong>Visitor ID:</strong> {{ visitorId }}
          </div>
          <button (click)="reload()">
            Generate New Thumbmark
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ThumbmarkExampleComponent implements OnInit, OnDestroy {
  version = version;
  tmVersion = getVersion();
  thumbmark: string | null = null;
  visitorId: string | null = null;
  isLoading = false;
  error: Error | null = null;

  private subscriptions = new Subscription();

  constructor(private thumbmarkService: ThumbmarkService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.thumbmarkService.thumbmark$.subscribe(v => this.thumbmark = v)
    );
    this.subscriptions.add(
      this.thumbmarkService.visitorId$.subscribe(v => this.visitorId = v)
    );
    this.subscriptions.add(
      this.thumbmarkService.isLoading$.subscribe(v => this.isLoading = v)
    );
    this.subscriptions.add(
      this.thumbmarkService.error$.subscribe(v => this.error = v)
    );

    this.thumbmarkService.get();
  }

  reload(): void {
    this.thumbmarkService.reload();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
