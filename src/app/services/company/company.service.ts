import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }

  create(form: object) {
    const url = `${environment.apiUrl}/createcompany`;
    return this.httpClient.post(url, form)
  }

  update(form: object) {
    const url = `${environment.apiUrl}/updatecompany`;
    return this.httpClient.post(url, form)
  }

  getList() {
    const url = `${environment.apiUrl}/companies`;
    return this.httpClient.get(url)
  }
  getExpeiredCompanyList(obj: object) {
    const url = `${environment.apiUrl}/companies`;
    return this.httpClient.post(url, obj)
  }

  changeStatus(obj: object) {
    const url = `${environment.apiUrl}/updatecompanystatus`;
    return this.httpClient.put(url, obj)
  }

  dashboard() {
    const url = `${environment.apiUrl}/companydashboard`;
    return this.httpClient.get(url)
  }

  createPlan(form: object) {
    const url = `${environment.apiUrl}/createplan`;
    return this.httpClient.post(url, form)
  }

  planAmount(form: object) {
    const url = `${environment.apiUrl}/createplanhistory`;
    return this.httpClient.post(url, form)
  }
  companyHistory(form: object) {
    const url = `${environment.apiUrl}/plandetails`;
    return this.httpClient.post(url, form)
  }
}
