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
  update(obj: object) {
    const url = `${this.apiUrl}/update-offer`;
    return this.httpClient.post(url, obj)
  }
  changeStatus(obj: object) {
    const url = `${this.apiUrl}/update-offer-status`;
    return this.httpClient.put(url, obj)
  }
  defaultOffer(obj: object) {
    const url = `${this.apiUrl}/update-default-offer`;
    return this.httpClient.put(url, obj)
  }
  deleteOffer(offerid: string) {
    const url = `${this.apiUrl}/delete-offer/`+offerid;
    return this.httpClient.delete(url)
  }
}
