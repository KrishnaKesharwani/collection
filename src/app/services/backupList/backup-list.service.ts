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

  getDownloadurl(obj: object, api_link: any) {
    // const url = `${this.apiUrl}/download-customers`;
    const url = `${this.apiUrl}/`+api_link;
    return this.httpClient.post(url, obj)
  }
  getDownloadloan(obj: object) {
    const url = `${this.apiUrl}/download-loan-history`;
    return this.httpClient.post(url, obj)
  }
}
