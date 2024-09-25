import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-provider-loan',
  templateUrl: './provider-loan.component.html',
  styleUrls: ['./provider-loan.component.scss']
})
export class ProviderLoanComponent {
  deleteAction: any;
  providerLoanForm!: FormGroup;

  constructor(private dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {
    this.providerLoanForm = this.fb.group({
      name: ['', Validators.required],
      start_date: [''],
      num_of_days: [''],
      installment_amount: [''],
      loan_amount: [''],
      end_date: [''],
      assign_member: [''],
      loan_details: ['']
    });

    this.dropdownService.setOptions(['Option A1', 'Option A2', 'Option A3']);
  }

  update() {
    this.providerLoanForm.markAllAsTouched()
    if (this.providerLoanForm.valid) {
      // this.dialog.closeAll();
    }
  }


}
