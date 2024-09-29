import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonComponentService {

  private dropdownOptionsSubject = new BehaviorSubject<{ [key: string]: string[] }>({});
  dropdownOptions$ = this.dropdownOptionsSubject.asObservable();

  setOptions(key: string, options: string[]) {
    const currentOptions = this.dropdownOptionsSubject.value;
    this.dropdownOptionsSubject.next({ ...currentOptions, [key]: options });
  }

  getOptions(key: string) {
    return this.dropdownOptionsSubject.value[key] || [];
  }
}
