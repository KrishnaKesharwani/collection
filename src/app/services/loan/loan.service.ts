import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }


  getLoanList(obj: object) {
    const url = `${environment.apiUrl}/companycustomerloans`;
    return this.httpClient.post(url, obj)
  }

  getCustomerLoanList(obj: object) {
    const url = `${environment.apiUrl}/companycustomerloans`;
    return this.httpClient.post(url, obj)
  }

  getMemberLoanList(obj: object) {
    const url = `${environment.apiUrl}/companycustomerloans`;
    return this.httpClient.post(url, obj)
  }

  updateLoanStatus(obj: object) {
    const url = `${environment.apiUrl}/update-loan-status`;
    return this.httpClient.put(url, obj)
  }

}
