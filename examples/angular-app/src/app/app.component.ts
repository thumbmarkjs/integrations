import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThumbmarkService } from '@thumbmarkjs/angular';
import { environment } from '../environments/environment';

interface TestState {
  title: string;
  thumbmark: string | null;
  visitorId: string | null;
  components: any;
  info: any;
  isLoading: boolean;
  error: Error | null;
  service: ThumbmarkService;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 900px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
      <header style="background-color: #2c3e50; padding: 20px; color: white; margin-bottom: 30px; text-align: center;">
        <h1 style="margin: 0;">ThumbmarkJS Angular Integration Tests</h1>
      </header>

      <div *ngFor="let test of tests; let i = index"
           style="border: 2px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 20px 0; background-color: #f9f9f9;">
        <h3>{{ test.title }}</h3>

        <div *ngIf="test.isLoading" style="padding: 10px; background-color: #e3f2fd; color: #1976d2; border-radius: 4px; font-weight: bold;">
          Loading...
        </div>

        <div *ngIf="test.error && !test.isLoading" style="padding: 10px; background-color: #ffebee; color: #c62828; border-radius: 4px; font-weight: bold;">
          Error: {{ test.error.message }}
        </div>

        <div *ngIf="!test.isLoading && !test.error && test.thumbmark"
             style="padding: 10px; background-color: #e8f5e8; color: #2e7d32; border-radius: 4px; font-family: monospace; word-break: break-all;">
          <div><strong>Thumbmark:</strong> {{ test.thumbmark }}</div>
          <div *ngIf="test.visitorId"><strong>Visitor ID:</strong> {{ test.visitorId }}</div>
          <div *ngIf="test.components"><strong>Component keys:</strong> {{ objectKeys(test.components).join(', ') }}</div>
          <div *ngIf="test.info"><strong>Info keys:</strong> {{ objectKeys(test.info).join(', ') }}</div>
        </div>

        <button (click)="reload(i)"
                [disabled]="test.isLoading"
                style="background-color: #2196f3; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 14px; margin-top: 15px;">
          {{ test.isLoading ? 'Loading...' : 'Reload' }}
        </button>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  tests: TestState[] = [];
  objectKeys = Object.keys;

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.tests = [
      this.createTest('Test 1: No API Key', new ThumbmarkService()),
      this.createTest('Test 2: With API Key', new ThumbmarkService({ apiKey: environment.thumbmarkApiKey })),
      this.createTest('Test 3: Invalid API Key', new ThumbmarkService({ apiKey: environment.thumbmarkApiKey, options: { exclude: ['webgl'], cache_api_call: false } })),
    ];

    for (const test of this.tests) {
      this.wireUp(test);
    }
  }

  private createTest(title: string, service: ThumbmarkService): TestState {
    return { title, service, thumbmark: null, visitorId: null, components: null, info: null, isLoading: false, error: null };
  }

  private wireUp(test: TestState): void {
    this.subscriptions.add(test.service.thumbmark$.subscribe(v => test.thumbmark = v));
    this.subscriptions.add(test.service.visitorId$.subscribe(v => test.visitorId = v));
    this.subscriptions.add(test.service.components$.subscribe(v => test.components = v));
    this.subscriptions.add(test.service.info$.subscribe(v => test.info = v));
    this.subscriptions.add(test.service.isLoading$.subscribe(v => test.isLoading = v));
    this.subscriptions.add(test.service.error$.subscribe(v => test.error = v));
  }

  reload(index: number): void {
    const test = this.tests[index];
    const start = performance.now();
    test.service.reload().then(() => {
      console.log(`${test.title} reloaded in ${(performance.now() - start).toFixed(0)}ms`);
    });
  }

  ngOnDestroy(): void {
    for (const test of this.tests) {
      test.service.destroy();
    }
    this.subscriptions.unsubscribe();
  }
}
