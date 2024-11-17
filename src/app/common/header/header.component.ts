import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {
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

  ngOnInit() {
    const data: any = localStorage.getItem('CurrentUser');
    const userData = JSON.parse(data);
    this.userType = userData.user_type;
    if (this.userType == 0) {

    } else if (this.userType == 1) {
      const currentAllData: any = localStorage.getItem('CompanyData');
      const currentCompanyDataParse = JSON.parse(currentAllData);
      this.userImage = currentCompanyDataParse.owner_image;
    } else if (this.userType == 2) {
      const currentAllData: any = localStorage.getItem('MemberData');
      const currentMemberDataParse = JSON.parse(currentAllData);
      this.userImage = currentMemberDataParse.image;
    } else {
      const currentAllData: any = localStorage.getItem('CustomerData');
      const currentCustomerDataParse = JSON.parse(currentAllData);   
      this.userImage = currentCustomerDataParse.image;   
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
