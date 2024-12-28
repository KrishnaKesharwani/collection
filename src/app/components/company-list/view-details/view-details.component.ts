import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company/company.service';

interface Transaction {
  item: string;
  cost: number;
  item2: string;
  cost2: number;
}
interface Transaction2 {
  item: string;
  cost: number;

}

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {

  companyDetails: any = [];

  company_id: any;
  data: any;
  constructor(public _service: CompanyService, public _tostr: ToastrService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {
    this.viewCompanyDetail();
  }

  viewCompanyDetail() {
    this.data = this.dataa.data;
  }

}
