import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { VcManagementService } from 'src/app/services/vcManagement/vc-management.service';

@Component({
  selector: 'app-change-member',
  templateUrl: './change-member.component.html',
  styleUrls: ['./change-member.component.scss']
})
export class ChangeMemberComponent {

  loading: boolean = false;
  changeStatusForm!: FormGroup;
  reason: string = '';
  data: any;
  customerListData: any[] = [];
  filteredDataarrayOverall: any[] = [];
  company_id: any;
  vcMembersExisting = true

  constructor(public _router: Router, public _customActionService: CustomActionsService, public _service: VcManagementService, public _tostr: ToastrService, public fb: FormBuilder, public dropdownService: CommonComponentService, public dialogRef: MatDialogRef<ChangeMemberComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {
    this.data = this.dataa.data;
    // console.log('Data Received', this.dataa.data);
    // this.changeStatusForm = this.fb.group({
    //   status: [this.dataa.data?.status, Validators.required],
    //   reason: ['', Validators.required]
    // });
    this.getVcAssignCustomerList();
  }
  getVcAssignCustomerList() {
    // this.loader = true;
    let obj = {
      company_id: this.company_id,
      vc_id: this.dataa.data.id
    }
    this._service.vcMembers(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.customerListData = response.data;
        this.filteredDataarray = response.data;
        // this.loader = false;
      }
    })
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

  submitVcMembers() {
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
  vcList(customerdata: any) {
    
  }
  openDialogAddCustomer() {
    let obj = {
      company_id: this.company_id,
      vc_id: this.dataa.data.id
    }
    this._service.companyOverallMembers(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.customerListData = response.data;
        this.filteredDataarray = response.data;
        // this.loader = false;
      }
    })
    this.vcMembersExisting = false;
    //   const dialogRef = this.dialog.open(ChangeMemberComponent, {
    //     disableClose: true,
    //     data: {
    //       title: 'Add VC Member',
    //       subTitle: 'Add Member to VC',
    //       data: {}
    //     },
    //   });

    //   dialogRef.afterClosed().subscribe((result: any) => {
    //     if (result) {
    //       this.getVcAssignCustomerList();
    //     }
    //   });
  }
  openDialogVcAdd(data: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'delete_popup',
      data: {
        title: 'Are you sure?',
        subTitle:
          'You want to assign VC for this member!'
      }
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.vcMembersExisting = true;
      // this.addVcMember(data);
    });
  }
   addVcMember(data: any) {
    this.loading = true;
    let obj = {
      company_id: this.company_id,
      vc_id: data.id,
      member_id: data.member_id
    }
    this._service.addVcMember(obj).subscribe((data: any) => {
      if (data.success) {
        this._tostr.success(data.message, 'Success');
        this.loading = false;
         this.dialogRef.close();
      } else {
        this._tostr.error(data.message, 'Error');
        this.loading = false;
      }
    }, error => {
      this.loading = false;
      this._tostr.error(error.error.message, 'Error');
    });
  }
}
