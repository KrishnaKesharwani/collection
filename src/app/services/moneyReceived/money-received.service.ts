import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoneyReceivedService {

  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }


  getCollection(obj: object) {
    const url = `${environment.apiUrl}/get-collections`;
    return this.httpClient.post(url, obj)
  }

  viewDetails(obj: object) {
    const url = `${environment.apiUrl}/get-collection-details`;
    return this.httpClient.post(url, obj)
  }
  advancedMoney(obj: object) {
    const url = `${environment.apiUrl}/pay-advance-to-member`;
    return this.httpClient.post(url, obj)
  }

  changeStatus(obj: object) {
    const url = `${environment.apiUrl}/pay-collection`;
    return this.httpClient.post(url, obj)
  }

  updateAmount(obj: object) {
    const url = `${environment.apiUrl}/update-deposit-money`;
    return this.httpClient.post(url, obj)
  }
}
