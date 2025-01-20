import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve token from local storage
    const authToken = localStorage.getItem('authToken');

    // Clone the request and add the Authorization header if the token exists
    let modifiedReq = req;
    if (authToken) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    // Handle the request
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized errors
          console.error('Session expired or logged out from another device');
          localStorage.clear(); // Clear the token and other stored data
          this.router.navigate(['/login']); // Redirect to login
        }
        return throwError(() => error);
      })
    );
  }
}


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptorService {

//   constructor() { }
// }
