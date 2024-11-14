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
      document: this.fb.array([])
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
      console.log('member Data: ', memberData.data);
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
    console.log('Form Data: ', this.providerLoanForm.value);
    const formData = new FormData();
    const documentArray = this.providerLoanForm.get('document') as FormArray;
    documentArray.controls.forEach((control, index) => {
      formData.append(`file${index}`, control.value);
    });

    // console.log('Form Data inner: ', formData);
    // var getDate = this.providerLoanForm.value['start_date'];
    // this.formattedDate = getDate.toLocaleDateString('en-US');
    // console.log('Form Data inner: ', this.formattedDate);
    if (this.providerLoanForm.valid) {
      this.loading = true;
      const formData = new FormData();
      const files = [
        { name: 'document', file: this.providerLoanForm.get('document')?.value },
      ];

      // Convert files to base64 strings
      // files.map(({ name, file }) => {
      //   return new Promise((resolve, reject) => {
      //     if (file) {

      //       const reader = new FileReader();
      //       reader.onloadend = () => {
      //         const base64String = reader.result as string; // Base64-encoded string
      //         formData.append(name, base64String); // Append base64 string to FormData
      //         resolve(true);
      //       };
      //       reader.onerror = () => reject(new Error(`Failed to read ${name}`));
      //       reader.readAsDataURL(file); // Read the file as a base64 string
      //     } else {
      //       resolve(true); // Resolve if no file
      //     }
      //   });
      // });

      // Append other form values to FormData !['document'].includes(key) &&
      Object.keys(this.providerLoanForm.value).forEach(key => {
        if (!['start_date'].includes(key) && !['end_date'].includes(key)) {
          formData.append(key, this.providerLoanForm.value[key]);
        }
        if (['start_date'].includes(key) || ['end_date'].includes(key)) {
          formData.append(key, this.providerLoanForm.value[key].toLocaleDateString('en-US'));
        }
      });

      formData.append('company_id', this.company_id)
      formData.append('customer_id', this.dataa.data.id)
      // formData.append('document', this.files[]);
      if (formData) {
        this._service.provideLoan(formData).subscribe((data: any) => {
          console.log(data)
          if (data.success) {
            this.providerLoanForm.reset();
            this._tostr.success(data.message, 'Success');
            this.dialogRef.close(true);
          } else {
            this._tostr.error(data.message, 'Error');
          }
        })
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

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];  // Get the selected file
    const documentArray = this.providerLoanForm.get('document') as FormArray;

    // Update the specific FormControl at the index with the file data
    documentArray.at(index).setValue(file);
  }


}
