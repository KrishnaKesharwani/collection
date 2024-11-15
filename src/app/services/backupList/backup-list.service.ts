import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackupListService {

  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api';
  private token: string | null = null;

  constructor(public httpClient: HttpClient) { }
  
  getbackupList(form: object) {
    const url = `${this.apiUrl}/backup-list?`;
    return this.httpClient.post(url, form)
  }
}
