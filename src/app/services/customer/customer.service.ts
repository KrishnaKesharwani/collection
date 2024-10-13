import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';
  private token: string | null = null;
  constructor(public httpClient: HttpClient) { }

  create(form: object) {
    const url = `${this.apiUrl}/createcustomer`;
    return this.httpClient.post(url, form)
  }

  update(form: object) {
    const url = `${this.apiUrl}/updatecustomer`;
    return this.httpClient.post(url, form)
  }

  getList(obj: object) {
    const url = `${this.apiUrl}/customers`;
    return this.httpClient.post(url, obj)
  }

  changeStatus(obj: object) {
    const url = `${this.apiUrl}/updatecustomerstatus`;
    return this.httpClient.put(url, obj)
  }
}
