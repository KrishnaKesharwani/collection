import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { VcManagementService } from 'src/app/services/vcManagement/vc-management.service';
import { ChangeMemberComponent } from '../change-member/change-member.component';
import { DeleteComponent } from 'src/app/common/delete/delete.component';

@Component({
  selector: 'app-add-vc',
  templateUrl: './add-vc.component.html',
  styleUrls: ['./add-vc.component.scss']
})
export class AddVcComponent {

  @Input() title: any;
  @Output() deleteAction = new EventEmitter();
  vcDetailsForm!: FormGroup;
  vcDetailsId!: 1;
  selectControl = new FormControl('');
  company_id: any;
  customerListData: any[] = [];
  user_type: any;

  vc_name: string = '';
  total_month: string = '';
  start_date: string = '';
  end_date: string = '';
  instalment_amount: string = '';
  final_amount: string = '';
  total_member: string = '';
  details: string = '';
  // selectedStatus = "fixed";
  loading: boolean = false;
  vc_image: any;
  // loader = false;

  constructor(public _router: Router, public _tostr: ToastrService, public _service_object: VcManagementService, public dialogRef: MatDialogRef<AddVcComponent>, public _customActionService: CustomActionsService, public _service: CustomerService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }


  ngOnInit() {
    // debugger;
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.user_type = userData.user_type;
    }
    this.getCustomerList();
    this.vcDetailsId = this.dataa.data.id;
    this.vcDetailsForm = this.fb.group({
      vc_name: ['', Validators.required],
      type: ['fixed', Validators.required],
      total_month: ['', Validators.required],
      total_member: ['', Validators.required],
      final_amount: ['', Validators.required],
      start_date: [''],
      end_date: [''],
      status: ['active', Validators.required],
      instalment_amount: [''],
      vc_image: [''],
      details: ['']
    });
    if (this.vcDetailsId) {
      this.vcDetailsView();
    }
  }

  onStatusChange(status: string) {
    // debugger;
    // this.selectedStatus = status;
    // const instalmentControl = this.vcDetailsForm.get('instalment_amount');
    // if (status === 'fixed') {
    //   instalmentControl?.setValidators([Validators.required]);
    // } else {
    //   instalmentControl?.clearValidators();   // Remove required
    //   instalmentControl?.setValue(null);      // Clear value
    // }
    // instalmentControl?.updateValueAndValidity();
  }
  vcDetailsView() {

    this.vcDetailsForm.patchValue({
      ...this.dataa.data,

    });
  }

  openDialogAddCustomer() {
    const dialogRef = this.dialog.open(ChangeMemberComponent, {
      disableClose: true,
      data: {
        title: 'Add VC Member',
        subTitle: 'Add Member to VC',
        data: {}
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getCustomerList();
      }
    });
  }

  openDialogVcRemove(data: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'delete_popup',
      data: {
        title: 'Are you sure?',
        subTitle:
          'You want to remove assign VC for this member!'
      }
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      // this.removeVcMember(data);
    });
  }
  searchColumns: any[] = ['name', 'type', 'status', 'i'];
  searchTerm: string = '';
  filteredDataarray: any[] = [];
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.customerListData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
  }
  removeVcMember(data: any) {
    this.loading = true;
    let obj = {
      company_id: this.company_id,
      vc_id: data.id,
      member_id: data.member_id
    }
    // this._customActionService.removeVcMember(obj).subscribe((data: any) => {
    //   if (data.success) {
    //     this._tostr.success(data.message, 'Success');
    //     this.loading = false;
    //     this.getCustomerList();
    //   } else {
    //     this._tostr.error(data.message, 'Error');
    //     this.loading = false;
    //   }
    // }, error => {
    //   this.loading = false;
    //   this._tostr.error(error.error.message, 'Error');
    // });
  }

  submitVcDetails() {
    if (this.vcDetailsId) {
      this.loading = true;
      // let obj = {
      //   company_id: this.company_id,
      //   vc_id: this.vcDetailsId,
      //   ...this.vcDetailsForm.value
      // }
      const formData = new FormData();
      Object.keys(this.vcDetailsForm.value).forEach(key => {
        formData.append(key, this.vcDetailsForm.value[key]);
      });
      if (!this.selectedFileVCImage) {
        formData.delete('image');
      }
      formData.append('company_id', this.company_id);
      formData.append('vc_id', this.dataa.data.id);
      debugger;
      this._service_object.update(formData).subscribe((data: any) => {
        this.loading = false;
        this.dialogRef.close(true);
        this._tostr.success(data.message, "Success");
        // this._router.navigate(['/fixed_deposit']);
      })
    } else {
      if (this.vcDetailsForm.valid) {
        let obj = {
          company_id: this.company_id,
          // deposit_id: this.vcDetailsId,
          ...this.vcDetailsForm.value
        }
        this._service_object.create(obj).subscribe((data: any) => {
          this.loading = false;
          this.dialogRef.close(true);
          this._tostr.success(data.message, "Success");
        })
      } else {
        this.vcDetailsForm.markAllAsTouched()
      }
    }
  }

  getCustomerList() {
    // this.loader = true;
    let obj = {
      company_id: this.company_id
    }
    this._service.getList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.customerListData = response.data;
        this.filteredDataarray = response.data;
        // this.loader = false;
      }
    })
  }

  onClose() {
    this.dialogRef.close();
  }

  selectedFileVCImage: File | null = null;
  VcImageChange(file: File | null): void {
    this.selectedFileVCImage = file;
  }
}
