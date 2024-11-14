import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let trade: any = JSON.parse(localStorage.getItem("CurrentUser")!);
    // const trade: any = JSON.parse(localStorage.getItem("CurrentUser")!);
    console.log(this.router.url, this.router.url.split('/'))

    if (trade && trade.token) {
      request = request.clone({
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + trade.token,
        })
      });
    }
    return next.handle(request);
  }
}
