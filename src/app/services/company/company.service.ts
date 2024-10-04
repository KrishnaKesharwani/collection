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

  getList() {
    const url = `${this.apiUrl}/companies`;
    return this.httpClient.get(url)
  }

  dashboard() {
    const url = `${this.apiUrl}/companydashboard`;
    return this.httpClient.get(url)
  }
}
