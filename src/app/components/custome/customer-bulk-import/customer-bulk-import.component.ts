import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ConnectableObservable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-bulk-import',
  templateUrl: './customer-bulk-import.component.html',
  styleUrls: ['./customer-bulk-import.component.scss']
})
export class CustomerBulkImportComponent {
  data: any[] = [];
  tableData: any[] = [];
  customerImportForm!: FormGroup;
  company_id: any;
  constructor(public _tostr: ToastrService, public _service: CustomerService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }) { }

  ngOnInit() {

    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }

    this.customerImportForm = this.fb.group({
      customer: ['']
    })
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const fileList = target.files; // Get the file list

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();

      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        if (typeof binaryStr === 'string') { // Ensure binaryStr is a string
          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          this.data = jsonData;
        }
      };
    }
  }

  updateData(event: Event, rowIndex: number, columnKey: string): void {
    const target = event.target as HTMLTableCellElement;
    this.data[rowIndex][columnKey] = target.innerText.trim();
  }
  submit() {

    let obj = {
      customers: this.data,
      company_id: this.company_id
    }


    this._service.importData(obj).subscribe((data: any) => {
      // if (data.error.customers.mobile && data.error.customers.email) {
      //   this._tostr.error(data.error.customers.email, 'Error');
      // }
      this._tostr.success(data.message, 'Success');
      this.dialog.closeAll();
    })

  }

  downloadExcel() {
    const data = [
      { name: '', mobile: '', email: '', aadhar_no: '', join_date: '', customer_login_id: '', password: '', status: '' }
    ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customer Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'customer-upload.xlsx');
  }
}
