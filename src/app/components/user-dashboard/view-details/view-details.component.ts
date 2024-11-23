import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {
  data: any;
  constructor(public dropdownService: CommonComponentService, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }) { }

  ngOnInit() {
    this.getViewDetails();
  }

  getViewDetails() {
    this.data = this.dataa.data;
  }
}
