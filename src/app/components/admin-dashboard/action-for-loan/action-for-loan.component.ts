import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-action-for-loan',
  templateUrl: './action-for-loan.component.html',
  styleUrls: ['./action-for-loan.component.scss']
})
export class ActionForLoanComponent {
  deleteAction: any;
  providerLoanForm!: FormGroup;
  providerLoanFormForCancelled!: FormGroup;
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
  selectedStatus: any;
  statusOptions: string[] = [];
  customer_id: any;

  constructor(public dialogRef: MatDialogRef<ActionForLoanComponent>, public _tostr: ToastrService, public _service: CustomerService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }



  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.customer_id = userData.customer_id;
    }

    this.providerLoanForm = this.fb.group({
      // customername: ['', Validators.required],
      loan_amount: ['', Validators.required],
      installment_amount: ['', Validators.required],
      assigned_member_id: [''],
      no_of_days: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      details: [''],
      loan_status: [''],
      status: ['pending'],
      document: this.fb.array([])
    });

    this.providerLoanFormForCancelled = this.fb.group({
      details: ['']
    })

    this.getActiveMemberList();

    // this.dropdownService.setOptions('status', ['Approved', 'Cancelled']);
    // this.dropdownService.setOptions('loanstatus', ['Approved', 'Running', 'Pending', 'Cancelled']);

  }

  onStatusChange(value: string) {
    // console.log('Status changed manually:', value);
    this.selectedStatus = value;
  }

  onClose() {
    this.dialogRef.close();
  }

  // getActiveMmberList() {
  //   let obj = {
  //     company_id: this.company_id,
  //     status: 'active'
  //   }
  //   this._service.activeMembers(obj).subscribe((memberData: any) => {
  //     const members = memberData.data.map((member: any) => member.name);
  //     this.dropdownService.setOptions('assingmember', members);
  //   })
  // }


  memberdata: [] = [];
  getActiveMemberList() {
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

  get document(): FormArray {
    return this.providerLoanForm.get('document') as FormArray;
  }

  addNewDoc(): void {
    this.document.push(new FormControl('')); // Add a new FormControl with an empty string as the initial value
  }

  selectedFile: File | null = null;

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];  // Get the selected file
    const documentArray = this.providerLoanForm.get('document') as FormArray;

    // Update the specific FormControl at the index with the file data
    documentArray.at(index).setValue(file);
  }

  removeDocument(index: number): void {
    this.document.removeAt(index);
  }

  submit() {
    if (this.selectedStatus == 'Approved') {

    }
    console.log(this.providerLoanForm.value)

    console.log(this.providerLoanFormForCancelled.value)
    if (this.providerLoanForm.valid) {
      if (this.providerLoanForm.valid) {
        this.loading = true

        const formData = new FormData();
        const files = [
          { name: 'document', file: this.providerLoanForm.get('document')?.value },
        ];

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
        // let obj = {
        //   company_id: this.company_id,
        //   customer_id: this.dataa.data.id,
        //   status: this.selectedStatus,
        //   // customername: this.providerLoanForm.value.customername,
        //   loan_amount: this.providerLoanForm.value.loan_amount,
        //   installment_amount: this.providerLoanForm.value.installment_amount,
        //   assigned_member_id: this.providerLoanForm.value.assigned_member_id,
        //   no_of_days: this.providerLoanForm.value.no_of_days,
        //   start_date: this.providerLoanForm.value.start_date,
        //   end_date: this.providerLoanForm.value.end_date,
        //   details: this.providerLoanForm.value.details,
        //   loan_status: this.providerLoanForm.value.loan_status,
        // }
        this._service.provideLoan(formData).subscribe((data: any) => {
          console.log(data)
          this.providerLoanForm.reset();
          this._tostr.success(data.message, 'Success');


        })
        // this.dialog.closeAll();
      } else {
        this.providerLoanForm.markAllAsTouched()
      }
    } else {
      let obj = {
        details: this.providerLoanFormForCancelled.value.details
      }
    }
  }
}
