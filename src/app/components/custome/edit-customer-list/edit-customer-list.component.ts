import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-customer-list',
  templateUrl: './edit-customer-list.component.html',
  styleUrls: ['./edit-customer-list.component.scss']
})
export class EditCustomerListComponent {
  @Input() title: any;
  @Input() subTitle: any;

  @Output() deleteAction = new EventEmitter();
  customerForm!: FormGroup;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }
    , public fb: FormBuilder) { }

  onNoClick() {
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      customerNo: [''],
      customerName: ['', Validators.required]
    });
  }

  update() {
    this.customerForm.markAllAsTouched()

  }
}
