import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent {

  user_type: any;
  editForm!: FormGroup;
  companyName: string = '';
  ownerName: string = "";
  mobile: string = '';
  primaryColor: string = '';
  secondaryColor: string = '';
  companyLoginId: string = '';
  // aadhar_no: string = '';
  address: string = '';
  loading = false;
  constructor(
    private actionService: ActionService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _toastr: ToastrService,
    public _service: CompanyService,
    private dropdownService: CommonComponentService, public fb: FormBuilder) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.user_type = userData.user_type;
    }
    this.editForm = this.fb.group({
      companyName: ['', Validators.required],
      ownerName: ['', Validators.required],
      mobile: ['', Validators.required],
      primaryColor: ['', Validators.required],
      secondaryColor: ['', Validators.required],
      // aadhar_no: ['', Validators.required],
      companyLoginId: [''],
      address: ['', Validators.required],
      profile: [null],
      main_logo: [null],
      sidebar_logo: [null],
      favicon_icon: [null],
    });

  }

  updateDetails(){

  }
  selectedFile_profile: File | null = null;
  profileChange(file: File | null): void {
    this.selectedFile_profile = file;
    this.editForm.patchValue({ profile: file });
  }

  selectedFile_mainlogo: File | null = null;
  mainlogoChange(file: File | null): void {
    this.selectedFile_mainlogo = file;
    this.editForm.patchValue({ main_logo: file });
  }

  selectedFile_sidebarlogo: File | null = null;
  sidebarChange(file: File | null): void {
    this.selectedFile_sidebarlogo = file;
    this.editForm.patchValue({ sidebar_logo: file });
  }

  selectedFile_feviconlogo: File | null = null;
  feviconChange(file: File | null): void {
    this.selectedFile_feviconlogo = file;
    this.editForm.patchValue({ favicon_icon: file });
  }

}
