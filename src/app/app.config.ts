import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptorService} from "./core/services/error-interceptor.service";
import {ConfigService} from "./core/services/config.service";

export function configServiceFactory(config: ConfigService): () => Promise<boolean> {
  return (): Promise<boolean> => config.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    }]
};
