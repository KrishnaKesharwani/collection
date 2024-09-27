import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {

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
      customerLoginId: [''],
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


  save() {
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
