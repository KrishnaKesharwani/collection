import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { ReceivedAmountComponent } from '../../company-list/received-amount/received-amount.component';
import { ReceivedAmountComponent } from '../received-amount/received-amount.component';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {
  constructor(public dialogRef: MatDialogRef<ViewDetailsComponent>, 
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },) { }
  // @Input() data: any;
  @Input() title: any;
  pendingUserData: any;
  data: any;
  loader = false;
  ngOnInit() {
    debugger;
    // this.pendingUserData = this.dataa.data;
    this.data = this.dataa.data;
  }
  onClose() {
    this.dialogRef.close();
  }
  paymentSubmit(data: any) {
    const dialogRef = this.dialog.open(ReceivedAmountComponent, {
      disableClose: true,
      data: {
        title: 'Received Amount',
        data: data
      },
    });
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

