import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }

  create(form: object) {
    const url = `${this.apiUrl}/createmember`;
    return this.httpClient.post(url, form)
  }

  update(form: object) {
    const url = `${this.apiUrl}/updatemember`;
    return this.httpClient.post(url, form)
  }

  getList(obj: object) {
    const url = `${this.apiUrl}/members`;
    return this.httpClient.post(url, obj)
  }

  changeStatus(obj: object) {
    const url = `${this.apiUrl}/updatememberstatus`;
    return this.httpClient.put(url, obj)
  }

  unassignedLoans(obj: object) {
    const url = `${this.apiUrl}/unassigned-loan`;
    return this.httpClient.post(url, obj)
  }

}
