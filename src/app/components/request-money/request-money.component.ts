import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { LoanService } from 'src/app/services/loan/loan.service';
import { ToastrService } from 'ngx-toastr';
import { BackupListService } from 'src/app/services/backupList/backup-list.service';

@Component({
  selector: 'app-request-money',
  templateUrl: './request-money.component.html',
  styleUrls: ['./request-money.component.scss']
})
export class RequestMoneyComponent {
  // private isDialogOpen = false;
  // filteredDataarray: any;
  loader: boolean = false;
  company_id: any;
  customer_id: any;
  requestList: any[] = [];

  constructor(public _backupService: BackupListService, public dialog: MatDialog, public _service: LoanService, public _tostr: ToastrService) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.customer_id = userData.customer_id;
    }
    this.getRequestLoanList();
  }

  getRequestLoanList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      loan_status: 'Approved',
      status: 'Active'
    }
    this._service.getMemberLoanList(obj).subscribe((data: any) => {
      this.loader = false;
      console.log(data)
      this.requestList = data.data;
    }, error => {
      this.loader = false;
      this._tostr.error(error.error.message, 'Error');

    })
  }

  openDialogViewDetail(data?: any): void {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      data: {
        title: 'Request Details',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      // this.isDialogOpen = false;
    });
  }

}
