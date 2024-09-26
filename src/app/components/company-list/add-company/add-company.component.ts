import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {

  companyForm!: FormGroup;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }
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
  }


  save() {
    // Add New Company
    this.companyForm.markAllAsTouched()
    if (this.companyForm.valid) {
      // this.dialog.closeAll();
    }
  }

}
