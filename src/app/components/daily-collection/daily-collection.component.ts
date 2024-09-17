import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-collection',
  templateUrl: './daily-collection.component.html',
  styleUrls: ['./daily-collection.component.scss']
})
export class DailyCollectionComponent {
  loanassign_action = 0;
  constructor() { }

  ngOnInit(): void {
  }

  loanAssignMember(action: number) {
    this.loanassign_action = action;
  }
}
