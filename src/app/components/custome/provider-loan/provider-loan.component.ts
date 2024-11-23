import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-provider-loan',
  templateUrl: './provider-loan.component.html',
  styleUrls: ['./provider-loan.component.scss']
})
// interface CustomFile {
//   name: string;
//   file: File;
// }
export class ProviderLoanComponent {
  deleteAction: any;
  providerLoanForm!: FormGroup;
  loading = false;
  customername: string = ""
  loanamount: string = "";
  instalmentamount: string = "";
  noofdays: string = "";
  startdate: string = "";
  enddate: string = "";
  loandetails: string = "";
  company_id: any;
  startDate: string = '';
  endDate: string = '';
  noOfDays: number | null = null;
  installment_amount: string = '';
  details: string = '';
  // no_of_days: string = '';
  loan_amount: string = '';
  start_date: any;
  end_date: any;
  no_of_days: string = '0';
  memberdata: [] = [];

  constructor(public dialogRef: MatDialogRef<ProviderLoanComponent>, public _tostr: ToastrService, public _service: CustomerService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }

    this.providerLoanForm = this.fb.group({
      customername: [this.dataa.data.name],
      loan_amount: ['', Validators.required],
      installment_amount: ['', Validators.required],
      assigned_member_id: [this.dataa?.data?.assigned_member_id || null],
      no_of_days: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      details: [''],
      loan_status: [''],
      status: [''],
      // document: this.fb.array([])
    });
    this.getActiveMmberList();
  }

  get document(): FormArray {
    return this.providerLoanForm.get('document') as FormArray;
  }

  addNewDoc(): void {
    this.document.push(new FormControl('')); // Add a new FormControl with an empty string as the initial value
  }

  removeDocument(index: number): void {
    this.document.removeAt(index);
  }

  base64Images: string[] = []; // Array to store Base64 strings for images
  base64allString: any;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files) return;

    const files = Array.from(input.files); // Convert FileList to Array
    const base64Promises = files.map((file) => this.convertToBase64(file));

    // Wait for all files to be converted and store them
    Promise.all(base64Promises).then((base64Strings) => {
      this.base64allString = base64Strings;
      this.base64Images = base64Strings.map((base64) =>
        base64.split(',')[1] // Remove the prefix
      );
    });

  }
  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);

      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file); // Read file as Base64
    });
  }
  // get documentControls() {
  //   return (this.providerLoanForm.get('document') as FormArray).controls;
  // }

  // addNewDoc() {
  //   (<FormArray>this.providerLoanForm.get('document')).push(new FormControl(null));
  // }


  // deleteDocument(index: number): void {
  //   // Remove the item at the specified index
  //   // (<FormArray>this.providerLoanForm.get('document')).splice(index, 1);
  //   // this.items.splice(index, 1);
  // }

  onClose() {
    this.dialogRef.close();
  }

  getActiveMmberList() {
    let obj = {
      company_id: this.company_id,
      status: 'active'
    }
    this._service.activeMembers(obj).subscribe((memberData: any) => {
      this.memberdata = memberData.data;
      const members = memberData.data.map((member: any) => member.name);
      this.dropdownService.setOptions('assingmember', memberData.data);
    })
  }

  onDateChange() {

    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      // Time difference in milliseconds
      const timeDifference = end.getTime() - start.getTime();

      // Convert time difference from milliseconds to days
      this.noOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    } else {
      this.noOfDays = null;
    }
  }

  formattedDate: string = '';
  submitProvideLoan() {
    if (this.providerLoanForm.valid) {
      this.loading = true;
      const formData = new FormData();
      // Append other form values to FormData !['document'].includes(key) &&
      Object.keys(this.providerLoanForm.value).forEach(key => {
        if (!['start_date'].includes(key) && !['end_date'].includes(key)) {
          formData.append(key, this.providerLoanForm.value[key]);
        }
        if (['start_date'].includes(key) || ['end_date'].includes(key)) {
          formData.append(key, this.providerLoanForm.value[key].toLocaleDateString('en-US'));
        }
      });
      if (this.base64allString.length) {
        formData.append('document', this.base64allString);
      }
      formData.append('company_id', this.company_id)
      formData.append('customer_id', this.dataa.data.id)
      // formData.append('document', this.files[]);
      if (formData) {
        this._service.provideLoan(formData).subscribe((data: any) => {
          if (data.success) {
            this.providerLoanForm.reset();
            this._tostr.success(data.message, 'Success');
            this.dialogRef.close(true);
          } else {
            this._tostr.error(data.message, 'Error');
          }
        }, error => {
          this.loading = false;
          this._tostr.error(error.message, 'Error');
        });
      }
      // this.dialog.closeAll();
    } else {
      this.providerLoanForm.markAllAsTouched();
    }
  }

  onStartDateChange(newStartDate: any) {

    this.start_date = newStartDate;
    this.calculateDays();
  }

  // Event handler for end date change
  onEndDateChange(newEndDate: any) {

    this.end_date = newEndDate;
    this.calculateDays();
  }

  calculateDays() {

    if (this.start_date && this.end_date) {
      const startDate = new Date(this.start_date);
      const endDate = new Date(this.end_date);

      // Ensure end date is after start date
      if (endDate >= startDate) {
        // Calculate the number of days between the two dates
        const timeDifference = endDate.getTime() - startDate.getTime();
        const days = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
        this.no_of_days = days.toString();  // Convert the number to string
      } else {
        this.no_of_days = '0';
      }
    }
  }

  selectedFile: File | null = null;

  selectedFile2: File | null = null;
  onFileChange2(file: File | null): void {
    // debugger;
    this.selectedFile2 = file;
    // Handle the file as needed
  }
  onFileChange(event: any, index: number) {
    // debugger;
    const file = event.target.files[0];  // Get the selected file
    // this.selectedFile = file;
    const documentArray = this.providerLoanForm.get('document') as FormArray;
    // Update the specific FormControl at the index with the file data
    documentArray.at(index).setValue(file);
  }


}
