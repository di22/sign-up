import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {Configuration, Environment} from "../models/configuration.model";
import {SettingsService} from "./settings.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config!: Configuration;
  configUrl = '/assets/config';
  envUrl = 'env';
  private httpClient: HttpClient = inject(HttpClient);
  constructor() {}

  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        this.loadConfig().subscribe(
          config => {
            this.config = config;
            SettingsService.configurationEnvironment = this.config;
            resolve(true);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  loadConfig(): Observable<Configuration> {
    return this.loadEnvironment().pipe(
      mergeMap(currentEnv => {
        return this.loadFile<Configuration>(currentEnv.env, this.configUrl);
      })
    );
  }

  loadEnvironment(): Observable<Environment> {
    return this.loadFile<Environment>(this.envUrl, this.configUrl);
  }

  loadFile<T>(env: string, url: string): Observable<T> {
    return this.getJSON(`${url}/${env}.json`);
  }

  public getJSON<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }
}
