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

  importData(obj: object) {
    const url = `${this.apiUrl}/importcustomers`;
    return this.httpClient.post(url, obj)
  }

  activeMembers(obj: object) {
    const url = `${this.apiUrl}/members`;
    return this.httpClient.post(url, obj)
  }
  activeCustomer(obj: object) {
    const url = `${this.apiUrl}/customers`;
    return this.httpClient.post(url, obj)
  }
  provideLoan(obj: object) {
    const url = `${this.apiUrl}/createcustomerloan`;
    return this.httpClient.post(url, obj)
  }
  loanList(obj: object) {
    const url = `${this.apiUrl}/companycustomerloans`;
    return this.httpClient.post(url, obj)
  }
  applyLoan(obj: object) {
    const url = `${this.apiUrl}/loanrequest`;
    return this.httpClient.post(url, obj)
  }

  updateLoanStatus(obj: object) {
    const url = `${this.apiUrl}/update-loan-status`;
    return this.httpClient.put(url, obj)
  }


}
