import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent {
  
  user_type: any;
  editForm!: FormGroup;
  name: string = '';
  mobile: string = '';
  email: string = '';
  address: string = '';
  loading = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _toastr: ToastrService,
    private dropdownService: CommonComponentService,
    public fb: FormBuilder) { }

  ngOnInit() {
    // const data = sessionStorage.getItem('CurrentUser');
    // if (data) {
    //   const userData = JSON.parse(data);
    //   this.user_type = userData.user_type;
    // }
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      address: ['', Validators.required],
      profile: [null],
    });

  }

  selectedFile_profile: File | null = null;
  profileChange(file: File | null): void {
    this.selectedFile_profile = file;
    this.editForm.patchValue({ profile: file });
  }
  updateDetails() {

  }

}
