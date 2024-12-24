import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent {
  @Output() menuClick: EventEmitter<string> = new EventEmitter<string>();
  apic_sync_success = false;
  loading = false;
  staff_detail: any;
  usertype: any;
  user_type: any;
  userData: any;
  @Input() menuAction: string = '';
  menuActionClass = '';
  overlayActive: boolean = false;
  isActiveRoute: boolean = false;
  checkSideMenu = '';
  currentLogingImage: any = 'assets/imgs/master-logo.png';
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route matches your condition
        // debugger;
        // this.isActiveRoute = this.checkActiveRoute();
        // this.menuActionClass = "";
        // this.menuClick.emit(this.checkSideMenu);
        this.onOverlayClick();
      }
    });
  }
  checkActiveRoute(): boolean {
    // Adjust this logic based on your route pattern
    return this.router.url !== '/'; // Example: Any route other than home activates the flag
  }
  ngOnInit(): void {
    const data: any = localStorage.getItem('CurrentUser');
    const userData = JSON.parse(data);

    const allData: any = localStorage.getItem('AfterLoginData');
    const allLoginData = JSON.parse(allData);

    if (allLoginData.data.company?.primary_color != null) {
      document.documentElement.style.setProperty(
        '--theme-bgcolor',
        allLoginData.data.company?.primary_color
      );
      document.documentElement.style.setProperty(
        '--theme-primary-color',
        allLoginData.data.company?.primary_color
      );
      document.documentElement.style.setProperty(
        '--theme-secondary-color',
        allLoginData.data.company?.secondary_color
      );
    }
    // const imageData = localStorage.getItem('image');
    const imageData = userData.image;
    if (userData) {
      this.user_type = userData.user_type;
    } else {
      this.user_type = null; // or set a default value
    }
    if (imageData) {
      this.currentLogingImage = imageData;
    }
  }
  onOverlayClick() {
    if (this.menuActionClass != '') {
      this.menuActionClass = '';
    }
  }

  ngOnChanges() {
    // debugger;
    this.menuActionClass = this.menuAction;
    // if (this.menuActionClass == '') {
    //   this.overlayActive = false;
    // } else {
    //   this.overlayActive = true;
    // }
  }
  // onLeftMenuClick($event: { target: any; srcElement: any }) {
  // ;
  // this.menuActionClass = this.menuAction;
  // this.ngOnChanges();
  // let clickedElement = $event.target || $event.srcElement;
  // if (clickedElement.nodeName === "A") {
  //   let isCertainButtonAlreadyActive = clickedElement.parentElement.parentElement.querySelector(".active");
  //   // if a Button already has Class: .active
  //   if (isCertainButtonAlreadyActive) {
  //     isCertainButtonAlreadyActive.classList.remove("active");
  //   }
  //   clickedElement.className += " active";
  // }
  // }

  logout() {
    this.router.navigate(['/']);
  }
}
