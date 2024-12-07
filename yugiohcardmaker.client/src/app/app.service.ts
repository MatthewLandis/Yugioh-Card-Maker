import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  endpoint = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  public getDarkMagician(): Observable<{ title: string; level: number }> {
    return this.http.get<{ title: string; level: number }>(`${this.endpoint}/api/Card/DarkMagician`);
  }
}
