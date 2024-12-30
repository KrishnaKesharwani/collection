import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebarVisible = new BehaviorSubject<boolean>(false);

  sidebarVisibility$ = this.sidebarVisible.asObservable();

  toggleSidebar() {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  closeSidebar() {
    this.sidebarVisible.next(false);
  }
}
