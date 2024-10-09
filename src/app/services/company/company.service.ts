import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }

  create(form: object) {
    const url = `${this.apiUrl}/createcompany`;
    return this.httpClient.post(url, form)
  }

  update(form: object) {
    const url = `${this.apiUrl}/updatecompany`;
    return this.httpClient.post(url, form)
  }

  getList() {
    const url = `${this.apiUrl}/companies`;
    return this.httpClient.get(url)
  }
  getExpeiredCompanyList(form: object) {
    const url = `${this.apiUrl}/companies`;
    return this.httpClient.post(url, form)
  }

  changeStatus(obj: object) {
    const url = `${this.apiUrl}/updatecompanystatus`;
    return this.httpClient.put(url, obj)
  }

  dashboard() {
    const url = `${this.apiUrl}/companydashboard`;
    return this.httpClient.get(url)
  }

  createPlan(form: object) {
    const url = `${this.apiUrl}/createplan`;
    return this.httpClient.post(url, form)
  }

  planAmount(form: object) {
    const url = `${this.apiUrl}/createplanhistory`;
    return this.httpClient.post(url, form)
  }
  companyHistory(form: object) {
    const url = `${this.apiUrl}/plandetails`;
    return this.httpClient.post(url, form)
  }
}
