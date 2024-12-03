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
  currentLogingImage: any = 'assets/imgs/master-logo.png';
  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    const data: any = localStorage.getItem('CurrentUser');
    const userData = JSON.parse(data);
    const allData: any = localStorage.getItem('AfterLoginData');
    const allLoginData = JSON.parse(allData);
    if (allLoginData.data.company?.primary_color != null) {
      document.documentElement.style.setProperty('--theme-bgcolor', allLoginData.data.company?.primary_color);
      document.documentElement.style.setProperty('--theme-primary-color', allLoginData.data.company?.primary_color);
      document.documentElement.style.setProperty('--theme-secondary-color', allLoginData.data.company?.secondary_color);
    }
    // const imageData = localStorage.getItem('image');
    const imageData = userData.image;
    if (data) {
      this.user_type = userData.user_type;
      // this.currentLogingImage = userData.image;
    } else {
      this.user_type = null; // or set a default value
    }
    if (imageData) {
      this.currentLogingImage = imageData;
    }
  }

  ngOnChanges() {
    this.menuActionClass = this.menuAction;
  }
  // onLetfMenuClick($event: { target: any; srcElement: any; }) {
  //   let clickedElement = $event.target || $event.srcElement;
  //   if (clickedElement.nodeName === "A") {
  //     let isCertainButtonAlreadyActive = clickedElement.parentElement.parentElement.querySelector(".active");
  //     // if a Button already has Class: .active
  //     if (isCertainButtonAlreadyActive) {
  //       isCertainButtonAlreadyActive.classList.remove("active");
  //     }
  //     clickedElement.className += " active";
  //   }
  // }

  logout() {
    this.router.navigate(['/']);
  }
}
