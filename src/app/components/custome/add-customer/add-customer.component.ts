import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  @Input() title: any;
  @Input() subTitle: any;

  @Output() deleteAction = new EventEmitter();
  customerForm!: FormGroup;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }
    , public fb: FormBuilder) { }


  ngOnInit() {
    this.customerForm = this.fb.group({
      customerNo: [''],
      customerName: ['', Validators.required],
      mobile: ['', Validators.required],
      adharNumber: ['', Validators.required]
    });
  }

  submit() {
    this.customerForm.markAllAsTouched()
    if (this.customerForm.valid) {
      // this.dialog.closeAll();
    }
  }
}
