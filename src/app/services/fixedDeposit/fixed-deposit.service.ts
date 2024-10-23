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
}
