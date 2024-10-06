import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent {
  addplanForm!: FormGroup;
  startDate: string = '';
  endDate: string = '';
  totalAmount: string = '';
  receiveAmount: string = '';
  planDetails: string='';
  loading = false;
  dropdownService: any;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }
    , public fb: FormBuilder) { }

  ngOnInit() {
    this.dropdownService.setOptions('planType', ['Monthly', 'Quarterly', 'Half Yerly', 'Yearly', 'Demo']);
    this.addplanForm = this.fb.group({
      planType: [''],
      startDate: [''],
      endDate: [''],
      totalAmount: [''],
      receiveAmount: [''],
      planDetails: ['']
    });
  }

  addPlanDetails(){
    this.loading = true;
    
  }


}
