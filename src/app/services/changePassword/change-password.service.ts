import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {


  private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;

  constructor(public httpClient: HttpClient) { }

  passwordChange(form: object) {
    const url = `${this.apiUrl}/changepassword?`;
    return this.httpClient.post(url, form)
  }

}
