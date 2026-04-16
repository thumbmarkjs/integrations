# @thumbmarkjs/angular

Angular integration for [ThumbmarkJS](https://thumbmarkjs.com) - browser fingerprinting library.

## Installation

```bash
npm install @thumbmarkjs/angular @thumbmarkjs/thumbmarkjs
```

## Setup

### Standalone (Angular 16+)

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideThumbmark } from '@thumbmarkjs/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideThumbmark({
      apiKey: 'your-api-key', // optional
    }),
  ],
};
```

## Usage

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThumbmarkService } from '@thumbmarkjs/angular';

@Component({
  selector: 'app-example',
  template: `
    <div *ngIf="isLoading">Loading...</div>
    <div *ngIf="!isLoading">
      <p>Thumbmark: {{ thumbmark }}</p>
      <p>Visitor ID: {{ visitorId }}</p>
      <button (click)="reload()">Reload</button>
    </div>
  `,
})
export class ExampleComponent implements OnInit, OnDestroy {
  thumbmark: string | null = null;
  visitorId: string | null = null;
  isLoading = false;

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
    this.thumbmarkService.get();
  }

  reload(): void {
    this.thumbmarkService.reload();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
```

### Using AsyncPipe (recommended)

```typescript
@Component({
  selector: 'app-example',
  template: `
    <div *ngIf="thumbmarkService.isLoading$ | async">Loading...</div>
    <div *ngIf="!(thumbmarkService.isLoading$ | async)">
      <p>Thumbmark: {{ thumbmarkService.thumbmark$ | async }}</p>
      <p>Visitor ID: {{ thumbmarkService.visitorId$ | async }}</p>
    </div>
  `,
})
export class ExampleComponent implements OnInit {
  constructor(public thumbmarkService: ThumbmarkService) {}

  ngOnInit(): void {
    this.thumbmarkService.get();
  }
}
```

## API

### `provideThumbmark(config?)`

Returns Angular providers for standalone applications.

### `ThumbmarkService`

Injectable service with the following observables:

| Observable | Type | Description |
|---|---|---|
| `thumbmark$` | `Observable<string \| null>` | The generated thumbmark hash |
| `visitorId$` | `Observable<string \| null>` | The visitor ID |
| `components$` | `Observable<Record<string, any> \| null>` | Raw fingerprint components |
| `info$` | `Observable<Record<string, any> \| null>` | Additional info |
| `isLoading$` | `Observable<boolean>` | Loading state |
| `error$` | `Observable<Error \| null>` | Error state |

Methods:

| Method | Description |
|---|---|
| `get()` | Generate a thumbmark |
| `reload()` | Re-generate the thumbmark |

### Config

```typescript
interface ThumbmarkConfig {
  apiKey?: string;
  options?: ConstructorParameters<typeof Thumbmark>[0];
}
```

## License

MIT
