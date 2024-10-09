import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddPlanComponent } from '../add-plan/add-plan.component';
import { ReceivedAmountComponent } from '../received-amount/received-amount.component';
import { CompanyService } from 'src/app/services/company/company.service';
import { ToastrService } from 'ngx-toastr';

interface Transaction {
  start_date: string;
  end_date: string;
  plan: number;
  amount: number;
  pending: number;
  status: number;
}

@Component({
  selector: 'app-company-history',
  templateUrl: './company-history.component.html',
  styleUrls: ['./company-history.component.scss']
})
export class CompanyHistoryComponent {

  loanDetails: any = [];
  displayedColumns: string[] = ['start_date', 'end_date', 'plan', 'amount', 'pending', 'status'];
  transactions: Transaction[] = [
    { start_date: 'Member No.', end_date: '4', plan: 5, amount: 4, pending: 4, status: 1 }

  ];
  companyHistoryListData: any[] = [];
  company_id: any;
  loader = false;
  constructor(public _tostr: ToastrService, public _service: CompanyService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any },
  ) { }

  ngOnInit() {
    this.company_id = this.dataa.id;
    this.getCompanyHistoryList();
  }

  getCompanyHistoryList() {
    this.loader = true;
    let obj = {
      company_id: this.dataa.id
    }
    this._service.companyHistory(obj).subscribe((data: any) => {
      console.log(data)
      this.companyHistoryListData = data.data;
      this.loader = false;
    })
    // this.loader = false;
  }

  addNewPlan() {
    const dialogRef = this.dialog.open(AddPlanComponent, {
      data: {
        id: this.company_id,
        title: 'Add New Company Plan',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  addReceiveMoney(item_id: any) {

    const dialogRef = this.dialog.open(ReceivedAmountComponent, {
      data: {
        title: 'Received Plan Amount',
        id: item_id

      }

    });
  }
}
