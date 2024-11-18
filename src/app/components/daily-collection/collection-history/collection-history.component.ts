import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface Transaction {
  date: string;
  receiver: number;
  amount: number;
}

@Component({
  selector: 'app-collection-history',
  templateUrl: './collection-history.component.html',
  styleUrls: ['./collection-history.component.scss']
})
export class CollectionHistoryComponent {

  displayedColumns: string[] = ['date', 'receiver', 'amount'];
  transactions: Transaction[] = [
    { date: 'Member No.', receiver: 4, amount: 4 },
    { date: 'Profile Image', receiver: 5, amount: 4 },

  ];
  company_id: any;
  data: any;
  loader: boolean = false;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.getDepositDetails();
  }

  getDepositDetails() {
    this.loader = true;

    this.data = this.dataa.data;

    this.loader = false;
  }
}
