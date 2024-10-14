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
  loading = true;
  customername: string = ""
  loanamount: string = "";
  instalmentamount: string = "";
  noofdays: string = "";
  startdate: string = "";
  enddate: string = "";
  loandetails: string = "";

  constructor(private dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {

    this.dropdownService.setOptions('assingmember', ['Bhaijan', 'Roshan Kanojiya']);
    this.providerLoanForm = this.fb.group({
      customername: ['', Validators.required],
      loanamount: ['', Validators.required],
      instalmentamount: ['', Validators.required],
      noofdays: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      loandetails: ['']
    });
  }

  submit() {
    this.providerLoanForm.markAllAsTouched()
    if (this.providerLoanForm.valid) {
      // this.dialog.closeAll();
    }
  }


}
