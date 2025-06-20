import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CardMakerService {

  endpoint = AppConfig.apiEndpoint;

  constructor(private http: HttpClient) { }

  public getCards(): Observable<{ title: string; level: number }[]> {
    return this.http.get<{ title: string; level: number }[]>(`${this.endpoint}/api/Card/AllCards`);
  }

  public getDark(): Observable<{ PendulumScale: number }> {
    return this.http.get<{ PendulumScale: number  }>(`${this.endpoint}/api/Card/Dark`);
  }
}
