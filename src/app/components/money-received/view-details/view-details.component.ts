import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { MoneyReceivedService } from 'src/app/services/moneyReceived/money-received.service';
import { UpdateMoneyComponent } from '../update-money/update-money.component';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {
  @Input() title: any;
  loader = false;
  company_id: any;
  collection_id: any;
  collectionData: any;
  memberLatestData: any[] = [];

  constructor(public dialogRef: MatDialogRef<ViewDetailsComponent>,public _service: MoneyReceivedService, public routes: ActivatedRoute, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any, data: any },
  ) { }

  ngOnInit() {
    // const data = localStorage.getItem('CurrentUser');
    // if (data) {
    //   const userData = JSON.parse(data);
    //   this.company_id = userData.company_id;
    // }
    this.collectionData = this.dataa.data;
    this.getCollectionDetails();
  }

  getCollectionDetails() {
    this.loader = true;
    let obj = {
      collection_id: this.dataa.id
    }    
    this._service.viewDetails(obj).subscribe((data: any) => {
      this.memberLatestData = data.data.details;
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }

  editPaidAmount(item: any){
    const dialogRef = this.dialog.open(UpdateMoneyComponent, {
      disableClose: true,
      data: {
        data: item,
        title: 'Money Update Amount',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCollectionDetails();
      }
    });
  }
  onClose() {
    this.dialogRef.close(true);
  }
}
