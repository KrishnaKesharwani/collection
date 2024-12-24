import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-leave-member',
  templateUrl: './leave-member.component.html',
  styleUrls: ['./leave-member.component.scss']
})
export class LeaveMemberComponent {
  member_id: any;
  loading: any;

  constructor(public dialogRef: MatDialogRef<LeaveMemberComponent>, private cdr: ChangeDetectorRef, public _toastr: ToastrService, public router: Router, public _service: MemberService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }) { }
  ngOnInit() {

  }

  onClose() {
    this.dialogRef.close();
  }

  submit() {

  }
}
