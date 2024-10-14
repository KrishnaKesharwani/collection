import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-customer-bulk-import',
  templateUrl: './customer-bulk-import.component.html',
  styleUrls: ['./customer-bulk-import.component.scss']
})
export class CustomerBulkImportComponent {
  data: any[] = [];
  tableData: any[] = [];
  customerImportForm!: FormGroup;
  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }) { }

  ngOnInit() {
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

  submit() {
    // onSubmit() {
    //   if (this.data.length) {
    //     this.http.post('https://your-api-url.com/customers', this.data)
    //       .subscribe({
    //         next: (response) => {
    //         },
    //         error: (error) => {
    //         }
    //       });
    //   } else {
    //   }
    // }
  }

  downloadExcel() {
    const data = [
      { Name: 'Customer Name', Mobile: '6263626505', Email: 'customer@example.com', Aadhar: '1234-5678-9101', JoinDate: '2021-05-01', Login: 'johnlogin', Password: '*****', Address: '123 Main St', Loan: 5000, Pending: 2000, Instalment: 200, Status: 'Active' }
    ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customer Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'customer-upload.xlsx');
  }
}
