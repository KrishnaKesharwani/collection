import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CompanyService } from 'src/app/services/company/company.service';

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
  planDetails: string = '';
  loading = false;
  company_id: any;


  constructor(public _service: CompanyService, public _tostr: ToastrService, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any }
    , public fb: FormBuilder) { }

  ngOnInit() {
    this.company_id = this.dataa.id

    this.dropdownService.setOptions('planType', ['Monthly', 'Quarterly', 'Half Yerly', 'Yearly', 'Demo']);
    this.addplanForm = this.fb.group({
      planType: ['Demo', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      totalAmount: ['', Validators.required],
      receiveAmount: ['', Validators.required],
      planDetails: ['', Validators.required]
    });
  }

  addPlanDetails() {

    if (this.addplanForm.valid) {
      this.loading = true;
      let obj = {
        company_id: this.dataa.id,
        plan: this.addplanForm.value.planType,
        total_amount: this.addplanForm.value.totalAmount,
        advance_amount: this.addplanForm.value.receiveAmount,

        start_date: this.addplanForm.value.startDate,
        end_date: this.addplanForm.value.endDate,
        detail: this.addplanForm.value.planDetails
      }

      this._service.createPlan(obj).subscribe((data: any) => {
        console.log(data);

        if (data) {
          this._tostr.success(data.message, "Success");
          this.loading = false;
          this.addplanForm.value.reset();
          this.dialog.closeAll()
        } else {

          this._tostr.error(data, "Error");
        }
      },
        (error) => {
          this.loading = false; // Ensure loading is stopped
          if (error.status === 409) {
            this._tostr.error(error.error.message, 'Error');
          } else {
            this._tostr.error(error.message, 'Error');
          }
        })
    } else {
      this.addplanForm.markAllAsTouched()
    }


  }

}
