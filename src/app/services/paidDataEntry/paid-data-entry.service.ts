import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaidDataEntryService {


  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }


  collectMoney(obj: object) {
    const url = `${environment.apiUrl}/collectmoney`;
    return this.httpClient.post(url, obj)
  }

  collectDepositMoney(obj: object) {
    const url = `${environment.apiUrl}/collect-deposit-money`;
    return this.httpClient.post(url, obj)
  }
  depositDetails(obj: object) {
    const url = `${environment.apiUrl}/customer-deposit-history`;
    return this.httpClient.post(url, obj)
  }
  loanDetails(obj: object) {
    const url = `${environment.apiUrl}/customer-loan-history`;
    return this.httpClient.post(url, obj)
  }
}
