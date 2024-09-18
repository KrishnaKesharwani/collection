import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  apic_sync_success = false;
  loading = false;
  staff_detail: any
  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
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
