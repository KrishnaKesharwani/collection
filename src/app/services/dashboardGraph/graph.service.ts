import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';
  private token: string | null = null;
  constructor(public httpClient: HttpClient) { }

  lastDepositStatus(form: object) {
    const url = `${this.apiUrl}/company-deposit-status-graph`;
    return this.httpClient.post(url, form)
  }
}
