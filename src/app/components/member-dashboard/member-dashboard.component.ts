import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DailyCollectionService } from 'src/app/services/dailyCollection/daily-collection.service';
import { MemberDashboardService } from 'src/app/services/memberDashboard/member-dashboard.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.scss']
})
export class MemberDashboardComponent {
  company_id: any;
  member_id: any;
  collectionData: any[] = [];
  loader: boolean = false;
  total_customer: any;
  attended_customer: any;
  memberDepositData: any[] = [];
  loading: boolean = false;
  constructor(public _service: MemberDashboardService, public _memberService: DailyCollectionService, public _tostr: ToastrService) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.member_id = userData.member_id;
    }
    this.getMemberCollectionList();
    this.getDepsitForMember();
  }

  getMemberCollectionList() {
    this.loader = true;
    let obj = {
      member_id: this.member_id
    }

    this._service.getMemberCollection(obj).subscribe((data: any) => {

      console.log(data.data)
      this.attended_customer = data.data.attended_customer
      this.total_customer = data.data.total_customer
      this.collectionData = data.data.collection
    })
    this.loader = false
  }


  getDepsitForMember() {
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      member_id: this.member_id,
      status: "Active"
    }
    this._memberService.getDepositListForMember(obj).subscribe((data: any) => {
      console.log(data.data);
      this.memberDepositData = data.data.deposits;
    })
    this.loader = false;
  }

}
