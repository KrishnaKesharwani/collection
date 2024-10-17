import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  
  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }

  // create(form: object) {
  //   const url = `${this.apiUrl}/createmember`;
  //   return this.httpClient.post(url, form)
  // }

  // update(form: object) {
  //   const url = `${this.apiUrl}/updatemember`;
  //   return this.httpClient.post(url, form)
  // }
  // changeStatus(obj: object) {
  //   const url = `${this.apiUrl}/updatememberstatus`;
  //   return this.httpClient.put(url, obj)
  // }

  getList(obj: object) {
    const url = `${this.apiUrl}/companycustomerloans`;
    return this.httpClient.post(url, obj)
  }


}
