import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {
  companyForm!: FormGroup;

  constructor(private dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }
    , public fb: FormBuilder) { }

  ngOnInit() {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      ownerName: ['', Validators.required],
      mobile: ['', Validators.required],
      adharNumber: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      plan: [''],
      totalAmount: ['', Validators.required],
      advaceAmount: ['', Validators.required],
      status: [''],
      companyLoginId: ['', Validators.required],
      password: ['', Validators.required],
      companyLogo: [''],
      sidebarLogo: [''],
      faviconIcon: [''],
      ownerImgae: [''],
      address: ['', Validators.required],
      details: ['', Validators.required]
    });

    this.dropdownService.setOptions('plan', ['Monthly', 'Yearly', 'Demo']);
    this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }


  update() {
    // Add New Company
    this.companyForm.markAllAsTouched()
    if (this.companyForm.valid) {
      // this.dialog.closeAll();
    }
  }

  selectedFile: File | null = null;

  onFileChange(file: File | null): void {
    this.selectedFile = file;
    // Handle the file as needed
    console.log(file);
  }
  selectedFile2: File | null = null;

  onFileChange2(file: File | null): void {
    this.selectedFile2 = file;
    // Handle the file as needed
    console.log(file);
  }

  selectedFile3: File | null = null;

  onFileChange3(file: File | null): void {
    this.selectedFile3 = file;
    // Handle the file as needed
    console.log(file);
  }
  selectedFile4: File | null = null;

  onFileChange4(file: File | null): void {
    this.selectedFile4 = file;
    // Handle the file as needed
    console.log(file);
  }
}
