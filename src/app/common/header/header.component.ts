import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const data = localStorage.getItem('CurrentUser');
  }
  @Output() menuClick: EventEmitter<string> = new EventEmitter<string>();

  apic_sync_success = false;
  loading = false;
  staff_detail: any;
  userType: any;
  userImage: any = 'assets/imgs/default-pic.png';
  firmLogo: any;
  expiredDate: any;
  planType: any = 'Demo';
  staff_name: any;
  isExpanded: any = [];
  showMenuAction = false;
  currentUrl: string = '';
  offerData: any = [];
  offerShow = 0;
  masterRoughts = ['/dashboard', '/company_list', '/profile_details','/change_password'];
  companyRoughts = ['/dashboard', '/member_list', '/customer_list', '/loan_list', '/daily_collect_list', '/money_received', '/offers', '/fixed_deposit', '/vc_management', '/reports', '/request_money', '/profile_details','/change_password'];
  memberRoughts = ['/dashboard', '/customer_list', '/daily_collection', '/offers', '/profile_details','/change_password'];
  customerRoughts = ['/dashboard', '/my_loan_list', '/daily_collection', '/offers', '/request_money', '/change_password', '/profile_details'];
  
  ngOnInit() {
    const data: any = localStorage.getItem('CurrentUser');
    const userData = JSON.parse(data);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // alert(this.currentUrl);
      }
    });
    if (userData != null) {
      this.userType = userData?.user_type;
      if (this.userType == 0) {

      } else if (this.userType == 1) {
        const currentAllData: any = localStorage.getItem('CompanyData');
        const currentCompanyDataParse = JSON.parse(currentAllData);
        this.userImage = currentCompanyDataParse?.owner_image;
        this.expiredDate = currentCompanyDataParse?.end_date;
        this.planType = currentCompanyDataParse?.plan;
        setTimeout(() => {
          if (!this.companyRoughts.includes(this.currentUrl)) {
            this.router.navigate(['/dashboard']);
          }
        }, 1000);
      } else if (this.userType == 2) {
        const currentAllData: any = localStorage.getItem('MemberData');
        const currentMemberDataParse = JSON.parse(currentAllData);
        this.userImage = currentMemberDataParse.image;
        setTimeout(() => {
          if (!this.memberRoughts.includes(this.currentUrl)) {
            this.router.navigate(['/dashboard']);
          }
        }, 1000);
      } else if (this.userType == 3) {
        const currentAllData: any = localStorage.getItem('CustomerData');
        const currentCustomerDataParse = JSON.parse(currentAllData);
        this.userImage = currentCustomerDataParse?.image;
        setTimeout(() => {
          if (!this.customerRoughts.includes(this.currentUrl)) {
            this.router.navigate(['/dashboard']);
          }
          const currentOfferData: any = localStorage.getItem('OfferData');
          const customerOfferDataParse = JSON.parse(currentOfferData);
          this.offerData = customerOfferDataParse;
          this.offerShow = this.offerData?.default_offer;
        }, 1000);
      }

    }
    else {
      this.logout();
    }

    // if (data) {
    //   debugger;
    //   if (userData.image !== null && userData.image !== '') {
    //     this.userImage = userData.image;
    //     const customerData: any = localStorage.getItem('CustomerData');
    //   }
    // } else {
    //   this.userType = null;
    // }
  }

  onClose() {
    this.offerShow = 0;
  }
  checkDefaultOffer() {

  }
  logout() {
    localStorage.removeItem('CurrentUser');
    this.router.navigate(['/login']);
  }
  editProfile() {
    this.showMenuAction = false;
    this.router.navigate(['/profile_details']);
  }
  changePassword() {
    this.showMenuAction = false;
    this.router.navigate(['/change_password']);
  }
  checkSideMenu = '';

  onMenuClick() {
    if (this.checkSideMenu == '') {
      this.checkSideMenu = 'hideSidebar';
    } else {
      this.checkSideMenu = '';
    }
    this.menuClick.emit(this.checkSideMenu);
  }

  showhideMenu() {
    if (!this.showMenuAction) {
      this.showMenuAction = true;
    } else {
      this.showMenuAction = false;
    }
  }

}
