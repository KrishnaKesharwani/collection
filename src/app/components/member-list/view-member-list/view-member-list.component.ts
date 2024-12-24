import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-view-member-list',
  templateUrl: './view-member-list.component.html',
  styleUrls: ['./view-member-list.component.scss']
})


export class ViewMemberListComponent {
  member_details: any = [];


  data: any;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }


  ngOnInit() {
    this.viewMemberDetails();
  }

  viewMemberDetails() {
    this.data = this.dataa.data;
  }
}
