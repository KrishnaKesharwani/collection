import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {
    const data = sessionStorage.getItem('CurrentUser');
  }

  apic_sync_success = false;
  loading = false;
  staff_detail: any;
  usertype: any;
  userImage: any = 'assets/imgs/default-pic.png';
  firmLogo: any;
  expiredDate: any;
  planType: any = 'Demo';
  staff_name: any;
  isExpanded: any = [];

  logout() {
    sessionStorage.removeItem('CurrentUser');
    this.router.navigate(['/login']);
  }
  showMenuAction = false;
  showhideMenu() {
    if (!this.showMenuAction) {
      this.showMenuAction = true;
    } else {
      this.showMenuAction = false;
    }
  }
}
