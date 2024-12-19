import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberDashboardService {

  private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }

  getMemberCollection(form: object) {
    const url = `${this.apiUrl}/today-collection`;
    return this.httpClient.post(url, form)
  }
}
