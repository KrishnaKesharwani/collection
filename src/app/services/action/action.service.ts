import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ActionData {
  action: string;
  row: any;
}

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor() { }

  private actionSource = new BehaviorSubject<ActionData | null>(null);
  action$ = this.actionSource.asObservable();

  setAction(actionData: ActionData) {
    this.actionSource.next(actionData);
  }
}
