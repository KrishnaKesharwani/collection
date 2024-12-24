import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberDashboardService {

  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }

  getMemberCollection(form: object) {
    const url = `${environment.apiUrl}/today-collection`;
    return this.httpClient.post(url, form)
  }
}
