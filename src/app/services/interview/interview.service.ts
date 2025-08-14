import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(public httpclient: HttpClient ) { }

  getPosts(): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.httpclient.get(url);
  }

  getLoginDetails(obj: object) {
    const url= 'https://jsonplaceholder.typicode.com/posts';    
    return this.httpclient.post(url, obj);
  }
}
