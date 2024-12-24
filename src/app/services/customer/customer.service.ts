import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;
  constructor(public httpClient: HttpClient) { }

  create(form: object) {
    const url = `${environment.apiUrl}/createcustomer`;
    return this.httpClient.post(url, form)
  }

  update(form: object) {

    const url = `${environment.apiUrl}/updatecustomer`;
    return this.httpClient.post(url, form)
  }

  getList(obj: object) {
    const url = `${environment.apiUrl}/customers`;
    return this.httpClient.post(url, obj)
  }

  changeStatus(obj: object) {
    const url = `${environment.apiUrl}/updatecustomerstatus`;
    return this.httpClient.put(url, obj)
  }

  importData(obj: object) {
    const url = `${environment.apiUrl}/importcustomers`;
    return this.httpClient.post(url, obj)
  }

  activeMembers(obj: object) {
    const url = `${environment.apiUrl}/members`;
    return this.httpClient.post(url, obj)
  }
  activeCustomer(obj: object) {
    const url = `${environment.apiUrl}/customers`;
    return this.httpClient.post(url, obj)
  }
  provideLoan(obj: object) {
    const url = `${environment.apiUrl}/createcustomerloan`;
    return this.httpClient.post(url, obj)
  }
  loanList(obj: object) {
    const url = `${environment.apiUrl}/companycustomerloans`;
    return this.httpClient.post(url, obj)
  }
  applyLoan(obj: object) {
    const url = `${environment.apiUrl}/loanrequest`;
    return this.httpClient.post(url, obj)
  }

  updateLoanStatus(obj: object) {
    const url = `${environment.apiUrl}/update-loan-status`;
    return this.httpClient.put(url, obj)
  }


}
