import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.scss']
})
export class ApplyLoanComponent {
  applyLoanForm!: FormGroup;
  loading = true;
  customername: string = "";
  loanamount: any;
  loandetails: string = '';
  deleteAction: any;

  constructor(private dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {
    this.applyLoanForm = this.fb.group({
      customername: ['', Validators.required],
      loanamount: ['', Validators.required],
      loandetails: ['', Validators.required]
    });
  }

}
