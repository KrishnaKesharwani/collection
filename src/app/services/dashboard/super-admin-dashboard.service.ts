import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminDashboardService {
  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';
  constructor(public httpClient: HttpClient) { }

  // dashboard() {
  //   const url = `${this.apiUrl}/companydashboard`;
  //   return this.httpClient.get(url)
  // }
  // dashboardMember() {
  //   const url = `${this.apiUrl}/member-dashboard`;
  //   return this.httpClient.get(url)
  // }
  // dashboardCustomer() {
  //   const url = `${this.apiUrl}/customer-dashboard`;
  //   return this.httpClient.get(url)
  // }

  getDashboardBricsData(api_link: any) {
    const url = `${this.apiUrl}/`+api_link;
    return this.httpClient.get(url)
  }
}
