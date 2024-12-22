import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoneyReceivedService {

  private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }


  getCollection(obj: object) {
    const url = `${this.apiUrl}/get-collections`;
    return this.httpClient.post(url, obj)
  }

  viewDetails(obj: object) {
    const url = `${this.apiUrl}/get-collection-details`;
    return this.httpClient.post(url, obj)
  }
  advancedMoney(obj: object) {
    const url = `${this.apiUrl}/pay-advance-to-member`;
    return this.httpClient.post(url, obj)
  }

  changeStatus(obj: object) {
    const url = `${this.apiUrl}/pay-collection`;
    return this.httpClient.post(url, obj)
  }
  
  updateAmount(obj: object) {
    const url = `${this.apiUrl}/update-deposit-money`;
    return this.httpClient.post(url, obj)
  }
}
