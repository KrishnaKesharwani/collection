import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { VcManagementService } from 'src/app/services/vcManagement/vc-management.service';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent {

  loading: boolean = false;
  changeStatusForm!: FormGroup;
  reason: string = '';
  data: any;

  constructor(public _router: Router, public _service: VcManagementService, public _tostr: ToastrService, public fb: FormBuilder, public dropdownService: CommonComponentService, public dialogRef: MatDialogRef<ChangeStatusComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {
    // debugger;
    // console.log('Data Received', this.dataa.data);
    this.changeStatusForm = this.fb.group({
      status: [this.dataa.data?.status , Validators.required],
      reason: ['', Validators.required]
    });
    this.getViewDeposit();
  }

  submitStatus() {
    if (this.changeStatusForm.valid) {
      this.loading = true;
      let obj = {
        vc_id: this.dataa.data.id,
        ...this.changeStatusForm.value
      }
      this._service.statusChange(obj).subscribe((data: any) => {
        this.loading = false;
        this.dialogRef.close(true);
        this._tostr.success(data.message, "Success");
        // this._router.navigate(['/fixed_deposit']);
      })
    } else {
      this.changeStatusForm.markAllAsTouched()
    }

  }

  onClose() {
    this.dialogRef.close();
  }

  getViewDeposit() {
    this.data = this.dataa.data;
  }
}
