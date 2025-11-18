import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { VcManagementService } from 'src/app/services/vcManagement/vc-management.service';
import { ReceivedAmountComponent } from '../received-amount/received-amount.component';
import { VcPaidAmountComponent } from '../vc-paid-amount/vc-paid-amount.component';

@Component({
  selector: 'app-vc-received-members',
  templateUrl: './vc-received-members.component.html',
  styleUrls: ['./vc-received-members.component.scss']
})
export class VcReceivedMembersComponent {

  loading: boolean = false;
  changeStatusForm!: FormGroup;
  reason: string = '';
  data: any;
  customerListData: any[] = [];
  filteredDataarrayOverall: any[] = [];
  company_id: any;
  vcpaidmemberData: any;
  loader = false;
  constructor(public _router: Router, public _customActionService: CustomActionsService, public _service: VcManagementService, public _tostr: ToastrService, public fb: FormBuilder, public dropdownService: CommonComponentService, public dialogRef: MatDialogRef<VcReceivedMembersComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
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

  onClose() {
    this.dialogRef.close();
  }
  openDialogeAmount(data: any){
    this.dialog.open(VcPaidAmountComponent, {
      data: { title: 'Paid VC Amount to Member', data: this.dataa.data },
    });
  }

}
