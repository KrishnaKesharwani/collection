import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent {

  constructor(private dropdownService: CommonComponentService, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }) { }
}
