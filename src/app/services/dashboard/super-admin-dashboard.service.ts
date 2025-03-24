import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminDashboardService {
  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  constructor(public httpClient: HttpClient) { }

  // dashboard() {
  //   const url = `${environment.apiUrl}/companydashboard`;
  //   return this.httpClient.get(url)
  // }
  dashboardMember() {
    const url = `${environment.apiUrl}/member-dashboard`;
    return this.httpClient.get(url)
  }
  // dashboardCustomer() {
  //   const url = `${environment.apiUrl}/customer-dashboard`;
  //   return this.httpClient.get(url)
  // }

  getDashboardBricsData(api_link: any) {
    const url = `${environment.apiUrl}/` + api_link;
    return this.httpClient.get(url)
  }
}
