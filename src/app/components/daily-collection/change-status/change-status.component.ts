import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { DailyCollectionService } from 'src/app/services/dailyCollection/daily-collection.service';
interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent {
  loading = false;
  displayedColumns: string[] = ['item', 'cost'];
  statusForm!: FormGroup;
  transactions: Transaction[] = [
    { item: 'Fixed Deposit Name', cost: 4 },

    { item: 'Start Date', cost: 15 },
    { item: 'End Date', cost: 15 },
    { item: 'Days / Time Slot', cost: 15 },
    { item: 'Start Amount', cost: 15 },
    { item: 'End  Amount', cost: 15 }
  ];

  changeDepositStatusForm!: FormGroup;
  constructor(public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any }, public fb: FormBuilder, public _service: DailyCollectionService, public _tostr: ToastrService, public dialogRef: MatDialogRef<ChangeStatusComponent>,
  ) { }



  ngOnInit() {
    this.changeDepositStatusForm = this.fb.group({
      status: ['', Validators.required],
      status_changed_reason: ['', Validators.required]
    });
    // this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }

  onClose() {
    this.dialogRef.close();
  }
  changeStatus() {
    if (this.changeDepositStatusForm.valid) {
      this.loading = true;
      let obj = {
        deposit_id: this.dataa.id,
        ...this.changeDepositStatusForm.value
      }

      this._service.changeStatus(obj).subscribe((data: any) => {
        this._tostr.success(data.message, "Success");
        this.loading = false;
        this.dialogRef.close();
      });
    } else {
      this.changeDepositStatusForm.markAllAsTouched();
    }

  }
}
