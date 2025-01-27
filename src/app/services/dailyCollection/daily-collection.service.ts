import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyCollectionService {

  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;
  constructor(public httpClient: HttpClient) { }

  getMemberLoanList(form: object) {
    const url = `${environment.apiUrl}/companycustomerloans`;
    return this.httpClient.post(url, form)
  }
  getCustomerLoanList(form: object) {
    const url = `${environment.apiUrl}/companycustomerloans`;
    return this.httpClient.post(url, form)
  }

  getDepositListForCustomer(obj: object) {
    const url = `${environment.apiUrl}/company-customer-deposits`;
    return this.httpClient.post(url, obj)
  }

  getTodayCollection(obj: object) {
    const url = `${environment.apiUrl}/today-collection`;
    return this.httpClient.post(url, obj)
  }

  getDepositListForMember(obj: object) {
    const url = `${environment.apiUrl}/company-customer-deposits`;
    return this.httpClient.post(url, obj)
  }

  changeMember(obj: object) {
    const url = `${environment.apiUrl}/change-deposit-member`;
    return this.httpClient.post(url, obj)
  }

  changeStatus(obj: object) {
    const url = `${environment.apiUrl}/update-deposit-status`;
    return this.httpClient.put(url, obj)
  }
}
