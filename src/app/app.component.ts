import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moneyproject';

  showSidebar: boolean = true;
  user_type: any;

  constructor(private router: Router, private translate: TranslateService) {
    const browserLang = translate.getBrowserLang() || '';
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEndEvent = event as NavigationEnd; // Type assertion
        this.showSidebar = !navigationEndEvent.url.includes('/login');
      });
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

    if (data) {
      const userData = JSON.parse(data);
      this.user_type = userData.user_type
    } else {
      this.user_type = null; // or set a default value
    }

  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
