import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { SidebarService } from './services/sidebarService/sidebar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moneyproject';

  showSidebar: boolean = true;
  user_type: any;
  isLoggedIn: boolean = false;
  isVisible: boolean = false;
  constructor(private router: Router, private translate: TranslateService, 
    private _sidebarService: SidebarService) {
    const browserLang = translate.getBrowserLang() || '';
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  currentAction: string = '';
  handleMenuClick(action: string) {
    // debugger;
    // setTimeout(() => {
    this.currentAction = action;
    // }, 100);    
  }
  ngOnInit(): void {
    const data = localStorage.getItem('CurrentUser');
    this.isLoggedIn = !!data;
    if (data) {
      const userData = JSON.parse(data);
      this.user_type = userData.user_type
    }

    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    this._sidebarService.sidebarVisibility$.subscribe((visible) => {
      this.isVisible = visible;
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEndEvent = event as NavigationEnd; // Type assertion
        // this.showSidebar = !navigationEndEvent.url.includes('/login');
        this.isLoggedIn = !!localStorage.getItem('CurrentUser') && !navigationEndEvent.url.includes('/login');
      });
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
