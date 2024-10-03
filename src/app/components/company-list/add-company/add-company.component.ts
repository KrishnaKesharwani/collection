import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {

  companyForm!: FormGroup;
  company_id!: 1;
  constructor(private _toastr: ToastrService, public _service: CompanyService, private dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }
    , public fb: FormBuilder) { }

  ngOnInit() {
    this.companyForm = this.fb.group({
      company_name: ['', Validators.required],
      owner_name: ['', Validators.required],
      mobile: ['', Validators.required],
      aadhar_no: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      plan: ['', Validators.required],
      total_amount: ['', Validators.required],
      advance_amount: ['', Validators.required],
      status: ['', Validators.required],

      password: ['', Validators.required],
      company_login_id: [''],
      main_logo: [''],
      sidebar_logo: [''],
      favicon_icon: [''],
      owner_image: [''],
      address: ['', Validators.required],
      details: ['', Validators.required]
    });

    this.dropdownService.setOptions('plan', ['Monthly', 'Yearly', 'Demo']);
    this.dropdownService.setOptions('status', ['Active', 'Inactive']);

  }


  save() {

    // Add New Company
    this.companyForm.markAllAsTouched()
    if (this.companyForm.value) {
      console.log(this.companyForm.value)
      this._service.create(this.companyForm.value).subscribe((data: any) => {
        console.log(data)

        this._toastr.success(data, 'Success');
      })

      this.dialog.closeAll();
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

  selectedFile3: File | null = null;

  onFileChange3(file: File | null): void {
    this.selectedFile3 = file;
    // Handle the file as needed
  }
  selectedFile4: File | null = null;

  onFileChange4(file: File | null): void {
    this.selectedFile4 = file;
    // Handle the file as needed
  }

  update() {
    // Add New Company
    this.companyForm.markAllAsTouched()
    if (this.companyForm.valid) {
      // this.dialog.closeAll();
    }
  }




}
