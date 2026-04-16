import { ApplicationConfig } from '@angular/core';
import { provideThumbmark } from '@thumbmarkjs/angular';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideThumbmark({
      apiKey: environment.thumbmarkApiKey,
    }),
  ],
};
