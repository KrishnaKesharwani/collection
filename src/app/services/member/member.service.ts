import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }

  create(form: object) {
    const url = `${environment.apiUrl}/createmember`;
    return this.httpClient.post(url, form)
  }

  update(form: object) {
    const url = `${environment.apiUrl}/updatemember`;
    return this.httpClient.post(url, form)
  }

  getList(obj: object) {
    const url = `${environment.apiUrl}/members`;
    return this.httpClient.post(url, obj)
  }

  changeStatus(obj: object) {
    const url = `${environment.apiUrl}/updatememberstatus`;
    return this.httpClient.put(url, obj)
  }

  unassignedLoans(obj: object) {
    const url = `${environment.apiUrl}/unassigned-loan`;
    return this.httpClient.post(url, obj)
  }

  removeAssignLoan(obj: object) {
    const url = `${environment.apiUrl}/remove-loan-member`;
    return this.httpClient.post(url, obj)
  }

  removeAssignDeposit(obj: object) {
    const url = `${environment.apiUrl}/remove-loan-member`;
    return this.httpClient.post(url, obj)
  }

  assignLoanMember(obj: object) {
    const url = `${environment.apiUrl}/change-loan-member`;
    return this.httpClient.post(url, obj)
  }
}
