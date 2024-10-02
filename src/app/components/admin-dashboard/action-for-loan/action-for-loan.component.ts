import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-action-for-loan',
  templateUrl: './action-for-loan.component.html',
  styleUrls: ['./action-for-loan.component.css']
})
export class ActionForLoanComponent {

  constructor(private dropdownService: CommonComponentService, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }) { }

  ngOnInit() {
    this.dropdownService.setOptions('status', ['Approved', 'Pending', 'Cancelled', 'Other Reasons']);
  }



  send() { }
}
