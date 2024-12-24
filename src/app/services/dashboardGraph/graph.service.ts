import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;
  constructor(public httpClient: HttpClient) { }

  // company api
  lastDepositStatus(form: object) {
    const url = `${environment.apiUrl}/company-deposit-status-graph`;
    return this.httpClient.post(url, form)
  }

  loanStatus(form: object) {
    const url = `${environment.apiUrl}/loan-status-graph`;
    return this.httpClient.post(url, form)
  }

  // customer api
  customerLoanStatus(form: object) {
    const url = `${environment.apiUrl}/customer-loan-status-graph`;
    return this.httpClient.post(url, form)
  }
  customerLastDepositStatus(form: object) {
    const url = `${environment.apiUrl}/company-deposit-status-graph`;
    return this.httpClient.post(url, form)
  }

  // member api
  lastDaysAmount(form: object) {
    const url = `${environment.apiUrl}/member-received-amount-line-graph`;
    return this.httpClient.post(url, form)
  }
  assingReceivedAmoutn(form: object) {
    const url = `${environment.apiUrl}/loan-status-graph`;
    return this.httpClient.post(url, form)
  }
}
