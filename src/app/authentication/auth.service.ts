import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://pinku.tech/moneyCollectionBackend/api'; // Replace with your API URL
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(obj: object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, obj).pipe(
      tap((response: any) => {
        this.token = response.token;

        localStorage.setItem('token', response.token); // Save token to localStorage
      })
    );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }
}
