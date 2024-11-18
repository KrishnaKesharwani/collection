import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { DailyCollectionService } from 'src/app/services/dailyCollection/daily-collection.service';

@Component({
  selector: 'app-change-member',
  templateUrl: './change-member.component.html',
  styleUrls: ['./change-member.component.scss']
})
export class ChangeMemberComponent {
  changeMemberForm!: FormGroup;
  @Input() title: any;
  loading = false;
  @Output() deleteAction = new EventEmitter();
  deposit_id: any;

  constructor(public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }, public fb: FormBuilder, public _service: DailyCollectionService, public _tostr: ToastrService, public dialogRef: MatDialogRef<ChangeMemberComponent>,
  ) { }

  ngOnInit() {
    this.deposit_id = this.dataa.data.id;
    this.changeMemberForm = this.fb.group({
      assigned_member_id: [this.dataa?.data?.assigned_member_id || null],
    });
  }

  assignLoan() {
    let member_id = this.changeMemberForm.get('assigned_member_id')?.value;
    if (this.deposit_id != "") {
      this.loading = true;
      let obj = {
        member_id: member_id,
        deposit_id: this.deposit_id,
        reason: 'Assign new member'
      }

      this._service.changeMember(obj).subscribe((data: any) => {
        if (data) {
          this._tostr.success('Member Assign Successfully!......', 'Success');
          // Swal.fire({
          //   position: "center",
          //   icon: "success",
          //   title: 'Assign Loan',
          //   text: 'Loan Assign Successfully!......',
          //   showConfirmButton: false,
          //   timer: 1000
          // });
          this.dialogRef.close(true);
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


  onClose() {
    this.dialogRef.close();
  }
}
