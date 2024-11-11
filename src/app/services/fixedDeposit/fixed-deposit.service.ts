import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixedDepositService {

  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';

  constructor(public httpClient: HttpClient) { }

  customerNewDeposit(obj: object) {
    const url = `${this.apiUrl}/create-customer-deposit`;
    return this.httpClient.post(url, obj)
  }

  getFixedDeposit(obj: object) {
    const url = `${this.apiUrl}/fixed-deposits`;
    return this.httpClient.post(url, obj)
  }
  create(obj: object) {
    const url = `${this.apiUrl}/create-fixed-deposit`;
    return this.httpClient.post(url, obj)
  }
  update(obj: object) {
    const url = `${this.apiUrl}/update-fixed-deposit`;
    return this.httpClient.post(url, obj)
  }
  updateStatus(obj: object) {
    const url = `${this.apiUrl}/update-fixed-deposit-status`;
    return this.httpClient.post(url, obj)
  }
  payFixedDeposit(obj: object) {
    const url = `${this.apiUrl}/pay-fixed-deposit-money`;
    return this.httpClient.post(url, obj)
  }
  statusChange(obj: object) {
    const url = `${this.apiUrl}/update-fixed-deposit-status`;
    return this.httpClient.put(url, obj)
  }
}
