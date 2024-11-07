import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }


  getOfferList(obj: object) {
    const url = `${this.apiUrl}/offers`;
    return this.httpClient.post(url, obj)
  }
  create(obj: object) {
    const url = `${this.apiUrl}/create-offer`;
    return this.httpClient.post(url, obj)
  }
}
