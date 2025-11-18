import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VcManagementService {
  // private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;


  constructor(public httpClient: HttpClient) { }


  getVcList(obj: object) {
    const url = `${environment.apiUrl}/vcs`;
    return this.httpClient.post(url, obj)
  }
  create(obj: object) {
    const url = `${environment.apiUrl}/createvc`;
    return this.httpClient.post(url, obj)
  }
  update(obj: object) {
    const url = `${environment.apiUrl}/updatevc`;
    return this.httpClient.post(url, obj)
  }
  statusChange(obj: object) {
    const url = `${environment.apiUrl}/changeStatus`;
    return this.httpClient.put(url, obj)
  }
  vcMembers(obj: object) {
    const url = `${environment.apiUrl}/vcMembers`;
    return this.httpClient.put(url, obj)
  }
  companyOverallMembers(obj: object) {
    const url = `${environment.apiUrl}/companywiseMembers`;
    return this.httpClient.put(url, obj)
  }
  addVcMember(obj: object) {
    const url = `${environment.apiUrl}/addVcMember`;
    return this.httpClient.post(url, obj)
  }

  defaultOffer(obj: object) {
    const url = `${environment.apiUrl}/update-default-offer`;
    return this.httpClient.put(url, obj)
  }
  deleteOffer(offerid: string) {
    const url = `${environment.apiUrl}/delete-offer/` + offerid;
    return this.httpClient.delete(url)
  }
}
