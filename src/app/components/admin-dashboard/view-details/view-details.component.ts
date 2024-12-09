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
  showDetails = '';
  constructor(public dropdownService: CommonComponentService, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any; type: any; }) { }

  ngOnInit() {
    this.data = this.dataa.data;
    this.showDetails = this.dataa.type;
  }

}
