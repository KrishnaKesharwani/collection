import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { BackupListService } from 'src/app/services/backupList/backup-list.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { FixedDepositService } from 'src/app/services/fixedDeposit/fixed-deposit.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

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
  getListtype: any;
  constructor(public dialogRef: MatDialogRef<DownloadReportComponent>, public _tostr: ToastrService, public _service: CustomerService, public dropdownService: CommonComponentService, public _fixedDepositService: FixedDepositService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }, public _backupService: BackupListService, public _httpClient: HttpClient

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
  }

  downloadReport() {
    this.loading = true;
    let obj = {
      company_id: this.company_id,
      status: this.reportDownloadFrom.value.status
    }
    debugger;
    let type = this.dataa.data.type;
    if (type == 'customer_list') {
      type = 'download-customers';
    } else if (type == 'member_list') {
      type = 'download-members';
    } else if (type == 'loan_list') {
      type = 'download-loans';
    } else if (type == 'deposit_list') {
      type = 'download-deposits';
    } else if (type == 'offer_list') {
      type = 'download-offers';
    }
    this._backupService.getDownloadurl(obj, type).subscribe((data: any) => {
      const downloadUrl = data.data.download_url.full_url; // Retrieve the download URL
      this.downloadFile(downloadUrl);
      this.onClose();
      this.loading = false;
    }, error => {
      this.loading = false;
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


  submitDownload() {
    let obj = {
      company_id: this.company_id,
      status: this.reportDownloadFrom.value.status
    }
    // this._backupService.getBack(obj).subscribe((data: any) => {
    //   console.log(data.data);
    //   this._tostr.success(data.data, "Success");

    //   // const downloadedData = [
    //   //   { name: '', mobile: '', email: '', aadhar_no: '', join_date: '', customer_login_id: '', password: '', address: '', status: '' }
    //   // ];
    //   // const worksheet = XLSX.utils.json_to_sheet(downloadedData);
    //   // const workbook = XLSX.utils.book_new();
    //   // XLSX.utils.book_append_sheet(workbook, worksheet, 'Report Data');
    //   // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //   // const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    //   // saveAs(blob, 'report-data.xlsx');
    // }, error => {
    //   this._tostr.error(error.error.message, "Error");
    // });
  }

  onClose() {
    this.dialogRef.close();
  }
}
