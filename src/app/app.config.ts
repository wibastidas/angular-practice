import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { CustomPreloadingStrategy } from './strategies/custom-preloading.strategy';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(CustomPreloadingStrategy)
    ),
    provideHttpClient()
  ]
};
