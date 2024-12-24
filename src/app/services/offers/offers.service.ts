import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }


  getOfferList(obj: object) {
    const url = `${environment.apiUrl}/offers`;
    return this.httpClient.post(url, obj)
  }
  create(obj: object) {
    const url = `${environment.apiUrl}/create-offer`;
    return this.httpClient.post(url, obj)
  }
  update(obj: object) {
    const url = `${environment.apiUrl}/update-offer`;
    return this.httpClient.post(url, obj)
  }
  changeStatus(obj: object) {
    const url = `${environment.apiUrl}/update-offer-status`;
    return this.httpClient.put(url, obj)
  }
  defaultOffer(obj: object) {
    const url = `${environment.apiUrl}/update-default-offer`;
    return this.httpClient.put(url, obj)
  }
  deleteOffer(offerid: string) {
    const url = `${environment.apiUrl}/delete-offer/` + offerid;
    return this.httpClient.delete(url)
  }
}
