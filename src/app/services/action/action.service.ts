import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ActionData {
  action: string;
  row: any;
}

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;

  constructor(public httpClient: HttpClient) { }

  private actionSource = new BehaviorSubject<ActionData | null>(null);
  actions$ = this.actionSource.asObservable();

  setAction(actionData: ActionData) {

    this.actionSource.next(actionData);
  }

  setLanguage(form: object) {
    const url = `${this.apiUrl}/update-user-language`;
    return this.httpClient.put(url, form)
  }
}
