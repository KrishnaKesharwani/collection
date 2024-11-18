import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaidDataEntryService {


  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }


  collectMoney(obj: object) {
    const url = `${this.apiUrl}/collectmoney`;
    return this.httpClient.post(url, obj)
  }
  depositDetails(obj: object) {
    const url = `${this.apiUrl}/customer-deposit-history`;
    return this.httpClient.post(url, obj)
  }
}
