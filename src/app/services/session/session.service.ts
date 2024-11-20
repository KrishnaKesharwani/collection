import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private lastLoginImagePath: string = '';
  constructor() { }

  setImagePath(path: string): void {
    this.lastLoginImagePath = path;
  }
  getImagePath(): string {
    return this.lastLoginImagePath;
  }
}
