import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
  loan_amount: string = '';
  start_date: any;
  end_date: any;
  no_of_days: string = '0';
  memberdata: [] = [];
  joinedBase64: any[] = [];;
  base64Images: any[] = []; // Array to store Base64 strings for images
  base64allString: any[] = [];

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
      status: ['active'],
      document: ['']
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const files = Array.from(input.files); // Convert FileList to Array
    const base64Promises = files.map((file) => this.convertToBase64(file));

    Promise.all(base64Promises).then((base64Strings) => {
      this.base64allString = Array.isArray(base64Strings) ? base64Strings : [base64Strings];
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
      const timeDifference = end.getTime() - start.getTime();
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
      Object.keys(this.providerLoanForm.value).forEach(key => {
        if (!['start_date'].includes(key) && !['end_date'].includes(key)) {
          formData.append(key, this.providerLoanForm.value[key]);
        }
        if (['start_date'].includes(key) || ['end_date'].includes(key)) {
          formData.append(key, this.providerLoanForm.value[key].toLocaleDateString('en-US'));
        }
      });
      if (this.base64allString?.length) {
        formData.append('document', JSON.stringify(this.base64allString));
      } else {
        // formData.append('document', '');
      }
      formData.append('company_id', this.company_id)
      formData.append('customer_id', this.dataa.data.id)
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
    } else {
      this.providerLoanForm.markAllAsTouched();
    }
  }
}
