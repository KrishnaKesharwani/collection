import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  apic_sync_success = false;
  loading = false;
  staff_detail: any
  usertype: any;
  user_type: any;
  userData: any;
  @Input() menuAction: string = '';
  menuActionClass = "";
  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.user_type = userData.user_type
    } else {

      this.user_type = null; // or set a default value
    }

  }

  ngOnChanges() {
    this.menuActionClass = this.menuAction;
  }
  onLetfMenuClick($event: { target: any; srcElement: any; }) {
    let clickedElement = $event.target || $event.srcElement;
    if (clickedElement.nodeName === "A") {
      let isCertainButtonAlreadyActive = clickedElement.parentElement.parentElement.querySelector(".active");
      // if a Button already has Class: .active
      if (isCertainButtonAlreadyActive) {
        isCertainButtonAlreadyActive.classList.remove("active");
      }
      clickedElement.className += " active";
    }
  }

  logout() {
    this.router.navigate(['/']);
  }
}
