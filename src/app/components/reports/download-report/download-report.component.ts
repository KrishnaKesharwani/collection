import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { FixedDepositService } from 'src/app/services/fixedDeposit/fixed-deposit.service';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.scss']
})
export class DownloadReportComponent {
  deleteAction: any;
  reportDownloadFrom!: FormGroup;
  loading = false;
  customername: string = "";
  company_id: any;
  details: string = '';

  constructor(public dialogRef: MatDialogRef<DownloadReportComponent>, public _tostr: ToastrService, public _service: CustomerService, public dropdownService: CommonComponentService, public _fixedDepositService: FixedDepositService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.reportDownloadFrom = this.fb.group({
      status: ['active']
    });

    this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }
  submitDownload() {

  }
  onClose() {
    this.dialogRef.close();
  }
}
