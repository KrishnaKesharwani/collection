import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;
constructor(public httpClient: HttpClient) { }

  // company api
  lastDepositStatus(form: object) {
    const url = `${this.apiUrl}/company-deposit-status-graph`;
    return this.httpClient.post(url, form)
  }

  loanStatus(form: object) {
    const url = `${this.apiUrl}/loan-status-graph`;
    return this.httpClient.post(url, form)
  }

  // customer api
  customerLoanStatus(form: object) {
    const url = `${this.apiUrl}/customer-loan-status-graph`;
    return this.httpClient.post(url, form)
  }
  customerLastDepositStatus(form: object) {
    const url = `${this.apiUrl}/company-deposit-status-graph`;
    return this.httpClient.post(url, form)
  }

  // member api
  lastDaysAmount(form: object) {
    const url = `${this.apiUrl}/member-received-amount-line-graph`;
    return this.httpClient.post(url, form)
  }
  assingReceivedAmoutn(form: object) {
    const url = `${this.apiUrl}/loan-status-graph`;
    return this.httpClient.post(url, form)
  }
}
