import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-add-fixed-deposit',
  templateUrl: './add-fixed-deposit.component.html',
  styleUrls: ['./add-fixed-deposit.component.scss']
})
export class AddFixedDepositComponent {

  @Input() title: any;
  @Output() deleteAction = new EventEmitter();
  fixedDepositForm!: FormGroup;
  fixedDepositId!: 1;
  selectControl = new FormControl('');
  company_id: any;
  customerListData: any[] = [];
  user_type: any;

  constructor(public dialogRef: MatDialogRef<AddFixedDepositComponent>, public _customActionService: CustomActionsService, public _service: CustomerService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }


  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.user_type = userData.user_type;
    }
    this.getCustomerList();
    this.fixedDepositForm = this.fb.group({
      customer_name: ['', Validators.required],
      fixed_deposit_name: ['', Validators.required],
      moblie: ['', Validators.required],
      details: [''],
      email: [''],
      status: [''],
      address: [''],
      adhar_front: [''],
      adhar_back: [''],
      adhar_number: [''],
      start_amount: ['', Validators.required],
      end_amount: [''],
      start_date: [''],
      end_date: ['']
    });
    this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }

  save() {
    this.fixedDepositForm.markAllAsTouched()
    if (this.fixedDepositForm.valid) {
      // this.dialog.closeAll();
    }
  }
  
  loader = false;
  getCustomerList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id
    }
    this._service.getList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.customerListData = response.data;
        console.log('Customer Data', this.customerListData);
        this.loader = false;
      }
    })
  }
  onClose() {
    this.dialogRef.close();
  }
  update() {
    this.fixedDepositForm.markAllAsTouched()
    if (this.fixedDepositForm.valid) {
      // this.dialog.closeAll();
    }
  }

  selectedFile: File | null = null;

  onFileChange(file: File | null): void {
    this.selectedFile = file;
    // Handle the file as needed
  }

  selectedFile2: File | null = null;

  onFileChange2(file: File | null): void {
    this.selectedFile2 = file;
    // Handle the file as needed
  }
}
