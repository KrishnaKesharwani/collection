import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepositRequestService {


  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }


  depositRequest(obj: object) {
    const url = `${environment.apiUrl}/create-deposit-request`;
    return this.httpClient.post(url, obj)
  }

  getRequestMoney(obj: object) {
    const url = `${environment.apiUrl}/deposit-request-list`;
    return this.httpClient.post(url, obj)
  }
  getRequestMoneyForCustomer(obj: object) {
    const url = `${environment.apiUrl}/customer-request-list`;
    return this.httpClient.post(url, obj)
  }

  updateDepositRequest(obj: object) {
    const url = `${environment.apiUrl}/update-deposit-request-status`;
    return this.httpClient.put(url, obj)
  }
}
