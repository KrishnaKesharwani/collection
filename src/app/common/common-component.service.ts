import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomerService } from '../services/customer/customer.service';
import { MemberService } from '../services/member/member.service';

@Injectable({
  providedIn: 'root'
})

export class CommonComponentService {
  public getUnassignedData: any[] = [];
  constructor(private _service: CustomerService, public _memberService: MemberService) {
    this.getActiveMemberList();
    // this.getUnassignedLoans();
  }
  company_id: any;
  public getmemberdata: any[] = [];
  loanstatus = ['approved', 'paid', 'pending', 'cancelled'];
  actionForLoanStatus = ['approved', 'running', 'pending', 'cancelled'];
  loanliststatus = ['completed', 'paid', 'approved', 'pending', 'cancelled'];
  status = ['active', 'inactive'];
  debit_type = ['monthly', 'money back'];
  plan = ['monthly', 'quarterly', 'half yerly', 'yearly', 'demo'];
  offerType = ['offers', 'schemes'];
  moneyStatus = ['working', 'received', 'cancelled'];
  deposit_status = ['completed', 'cancelled'];
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
    if (this.company_id != '' && this.company_id != null) {
      this._service.activeMembers(obj).subscribe((memberDataAPi: any) => {
        this.getmemberdata = memberDataAPi.data;
      }, error => {
        console.log('Member error Found', error.massage);
      });
    }
  }



}
