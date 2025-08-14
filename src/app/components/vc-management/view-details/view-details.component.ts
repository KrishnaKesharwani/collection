import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {
  constructor(public dialogRef: MatDialogRef<ViewDetailsComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },) { }
  @Input() data: any;
  @Input() title: any;
  pendingUserData: any;
  loader = false;
  onInit() {
    this.pendingUserData = this.dataa.data;
  }
  onClose() {
    this.dialogRef.close();
  }

}


// export class ViewDetailsComponent {
//   @Input() title: any;
//   loader = false;
//   company_id: any;
//   collection_id: any;
//   collectionData: any;
//   memberLatestData: any[] = [];

//   constructor(public dialogRef: MatDialogRef<ViewDetailsComponent>, public _service: MoneyReceivedService, public routes: ActivatedRoute, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any, data: any },
//   ) { }

//   ngOnInit() {
//     this.collectionData = this.dataa.data;
//   }
// }

