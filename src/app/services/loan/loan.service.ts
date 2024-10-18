import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }


  getLoanList(obj: object) {
    const url = `${this.apiUrl}/companycustomerloans`;
    return this.httpClient.post(url, obj)
  }


}
