import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { MoneyReceivedService } from 'src/app/services/moneyReceived/money-received.service';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {
  @Input() title: any;
  loading = false;
  company_id: any;
  collection_id: any;
  memberData: any;
  customerData: any[] = [];

  constructor(public _service: MoneyReceivedService, public routes: ActivatedRoute, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any, data: any },
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;

    }



    this.getCollectionDetails();
  }

  getCollectionDetails() {
    let obj = {
      collection_id: this.dataa.id
    }

    this.memberData = this.dataa.data;
    console.log(this.memberData)

    this._service.viewDetails(obj).subscribe((data: any) => {
      console.log(data.data);

      this.customerData = data.data.details;
    })
  }
}
