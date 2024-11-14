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
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.userType = userData.user_type;
    } else {
      this.userType = null;
    }
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
