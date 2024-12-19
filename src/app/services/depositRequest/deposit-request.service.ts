import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepositRequestService {


  private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }


  depositRequest(obj: object) {
    const url = `${this.apiUrl}/create-deposit-request`;
    return this.httpClient.post(url, obj)
  }

  getRequestMoney(obj: object) {
    const url = `${this.apiUrl}/deposit-request-list`;
    return this.httpClient.post(url, obj)
  }
  getRequestMoneyForCustomer(obj: object) {
    const url = `${this.apiUrl}/customer-request-list`;
    return this.httpClient.post(url, obj)
  }

  updateDepositRequest(obj: object) {
    const url = `${this.apiUrl}/update-deposit-request-status`;
    return this.httpClient.put(url, obj)
  }
}
