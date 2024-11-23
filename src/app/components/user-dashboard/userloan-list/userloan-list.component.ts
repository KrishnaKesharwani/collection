import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplyLoanComponent } from '../../custome/apply-loan/apply-loan.component';
import { ViewDetailsComponent } from '../view-details/view-details.component';
import { LoanService } from 'src/app/services/loan/loan.service';
import { ToastrService } from 'ngx-toastr';
import { InstallmentHistoryComponent } from '../../loan-list/installment-history/installment-history.component';
import { BackupListService } from 'src/app/services/backupList/backup-list.service';

@Component({
  selector: 'app-userloan-list',
  templateUrl: './userloan-list.component.html',
  styleUrls: ['./userloan-list.component.scss']
})

export class UserloanListComponent {
  private isDialogOpen = false;
  filteredDataarray: any;
  loader: boolean = false;
  data: any[] = [];
  company_id: any;
  customer_id: any;
  loanList: any[] = [];
  member_id: any;
  constructor(public _backupService: BackupListService, public dialog: MatDialog, public _service: LoanService, public _tostr: ToastrService) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.customer_id = userData.customer_id;
      this.member_id = userData.member_id;
    }

    if (this.customer_id) {
      this.getCustomerLoanList();
    } else {
      this.getMemberLoanList();
    }
  }
  openDialogDownloadReport(data: any) {
    let obj = {
      loan_id: data.id,
    }
    this._backupService.getDownloadloan(obj).subscribe((data: any) => {
      const downloadUrl = data.data.download_url.full_url; // Retrieve the download URL
      this.downloadFile(downloadUrl);
    }, error => {
      this._tostr.error(error.error.message, "Error");
    });
  }

  downloadFile(filePath: string) {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'filename.extension';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  openDialogInstallmentHistory(data: any) {
    const dialogRef = this.dialog.open(InstallmentHistoryComponent, {
      data: {
        title: 'Loan Instalment History',
        data: data
      },
    });
  }

  getCustomerLoanList() {

    this.loader = true;
    let obj = {
      company_id: this.company_id,
      customer_id: this.customer_id,
      loan_status: 'Approved',
      status: 'Active'
    }
    this._service.getCustomerLoanList(obj).subscribe((data: any) => {
      this.loader = false;
      this.loanList = data.data.loans;
    }, error => {
      this.loader = false;
      this._tostr.error(error.error.message, 'Error');

    })
  }

  getMemberLoanList() {

    this.loader = true;
    let obj = {
      company_id: this.company_id,
      member_id: this.member_id,
      loan_status: 'Approved',
      status: 'Active'
    }
    this._service.getMemberLoanList(obj).subscribe((data: any) => {
      this.loader = false;
      this.loanList = data.data;
    }, error => {
      this.loader = false;
      this._tostr.error(error.error.message, 'Error');

    })
  }

  openDialogViewDetail(data?: any): void {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      data: {
        title: 'Loan Details',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.isDialogOpen = false;
    });
  }

  openDialogApplyLoan() {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(ApplyLoanComponent, {
      disableClose: true,
      data: {
        title: 'Apply New Loan',
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      // this.delete();
      this.isDialogOpen = false;
    });
  }
}
