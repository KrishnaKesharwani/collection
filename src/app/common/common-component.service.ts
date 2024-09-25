import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonComponentService {

  constructor() { }

  // start common dropdown service method/logic
  private dropdownOptionsSubject = new BehaviorSubject<string[]>([]);
  dropdownOptions$ = this.dropdownOptionsSubject.asObservable();

  setOptions(options: string[]) {
    this.dropdownOptionsSubject.next(options);
  }
  // end common dropdown service method/logic
}
