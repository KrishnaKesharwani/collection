import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackupListService {

  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;

  constructor(public httpClient: HttpClient) { }

  getbackupList(form: object) {
    const url = `${environment.apiUrl}/backup-list?`;
    return this.httpClient.post(url, form)
  }

  getDownloadurl(obj: object, api_link: any) {
    // const url = `${environment.apiUrl}/download-customers`;
    const url = `${environment.apiUrl}/` + api_link;
    return this.httpClient.post(url, obj)
  }
  getDownloadloan(obj: object) {
    const url = `${environment.apiUrl}/download-loan-history`;
    return this.httpClient.post(url, obj)
  }
}
