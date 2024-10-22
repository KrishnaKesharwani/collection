import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DailyCollectionService {

  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';
  private token: string | null = null;
  constructor(public httpClient: HttpClient) { }

  getMemberLoanList(form: object) {
    const url = `${this.apiUrl}/companycustomerloans`;
    return this.httpClient.post(url, form)
  }
  getCustomerLoanList(form: object) {
    const url = `${this.apiUrl}/companycustomerloans`;
    return this.httpClient.post(url, form)
  }
}
