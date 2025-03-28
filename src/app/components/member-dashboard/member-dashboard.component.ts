import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DailyCollectionService } from 'src/app/services/dailyCollection/daily-collection.service';
import { SuperAdminDashboardService } from 'src/app/services/dashboard/super-admin-dashboard.service';
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
  total_customer = 0;
  collect_amount = 0;
  attended_customer = 0;
  memberDepositData: any[] = [];
  loading: boolean = false;
  memberDashboardtBricsData: any;
  constructor(public _service: MemberDashboardService,
    public _memberService: DailyCollectionService, public toaster: ToastrService,
    public _bricsService: SuperAdminDashboardService) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.member_id = userData.member_id;
    }
    this.getMemberDashboardData();
    this.getMemberCollection();
    // this.getDepsitForMember();
  }

  getMemberCollection() {
    this.loader = true;
    let obj = {
      member_id: this.member_id
    }
    this._service.getMemberCollection(obj).subscribe((data: any) => {
      if (data.success || data.collection) {
        const userData = data?.data;
        this.attended_customer = userData.attended_customer;
        // this.total_customer = data.data?.total_customer;
        this.collect_amount = userData?.collect_money;
        this.collectionData = userData?.collection;
        this.loader = false;
        // console.log('Collection Data :', this.collectionData);
      } else {
        this.loader = false;
      }
    }, error => {
      this.toaster.error(error.massage, 'Error');
      this.loader = false;
    });
  }
  getMemberDashboardData() {
    // alert('Function Call');
    this._bricsService.dashboardMember().subscribe((response: any) => {
      if (response) {
        this.memberDashboardtBricsData = [];
        this.memberDashboardtBricsData = response.data;
        // alert(response.data?.today_collection);
        // console.log('Member Response Data', response.data);
        // console.log('Member Data', this.memberDashboardtData);
      }
    }, error => {
      this.toaster.error(error.massage, 'Error')
    });
  }

  // getDepsitForMember() {
  //   this.loader = true;
  //   let obj = {
  //     company_id: this.company_id,
  //     member_id: this.member_id,
  //     status: "Active"
  //   }
  //   this._memberService.getDepositListForMember(obj).subscribe((data: any) => {
  //     this.memberDepositData = data.data.deposits;
  //     this.loader = false;
  //   }, error => {
  //     this.loader = false;
  //     this.toaster.error(error.massage, 'Error')
  //   })
  // }

}
