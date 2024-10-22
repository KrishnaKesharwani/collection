import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomerService } from '../services/customer/customer.service';

@Injectable({
  providedIn: 'root'
})

export class CommonComponentService {
  constructor(private _service: CustomerService) {
    this.getActiveMemberList();
  }
  company_id: any;
  public getmemberdata: any[] = [];
  loanstatus = ['Approved', 'Paid', 'Pending', 'Cancelled'];
  status = ['Active', 'Inactive'];
  plan = ['Monthly', 'Quarterly', 'Half Yerly', 'Yearly', 'Demo'];
  private dropdownOptionsSubject = new BehaviorSubject<{ [key: string]: string[] }>({});
  dropdownOptions$ = this.dropdownOptionsSubject.asObservable();

  setOptions(key: string, options: string[]) {
    const currentOptions = this.dropdownOptionsSubject.value;
    this.dropdownOptionsSubject.next({ ...currentOptions, [key]: options });
  }

  getOptions(key: string) {
    return this.dropdownOptionsSubject.value[key] || [];
  }

  getActiveMemberList() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    let obj = {
      company_id: this.company_id,
      status: 'active'
    }
    this._service.activeMembers(obj).subscribe((memberDataAPi: any) => {
      this.getmemberdata = memberDataAPi.data;
    })
  }

}
