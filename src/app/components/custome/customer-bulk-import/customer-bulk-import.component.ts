import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-customer-bulk-import',
  templateUrl: './customer-bulk-import.component.html',
  styleUrls: ['./customer-bulk-import.component.scss']
})
export class CustomerBulkImportComponent {
  data: any[] = [];
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
}
