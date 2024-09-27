import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent {
  companyForm!: FormGroup;

  constructor(private dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }
    , public fb: FormBuilder) { }

  ngOnInit() {
    this.companyForm = this.fb.group({
      companyName: [''],
      ownerName: ['', Validators.required],
      mobile: ['', Validators.required],
      adharNumber: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      plan: [''],
      totalAmount: [''],
      advaceAmount: [''],
      status: [''],
      memberId: [''],
      password: [''],
      companyLogo: [''],
      sidebarLogo: [''],
      faviconIcon: [''],
      ownerImgae: [''],
      address: [''],
      details: ['']
    });

    this.dropdownService.setOptions(['Plan']);
  }


  update() {
    // Add New Company
    this.companyForm.markAllAsTouched()
    if (this.companyForm.valid) {
      // this.dialog.closeAll();
    }
  }
}
