import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-assign-loan',
  templateUrl: './assign-loan.component.html',
  styleUrls: ['./assign-loan.component.scss']
})
export class AssignLoanComponent {

  selectedValue: string | undefined;
  selectedCar: string | undefined;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  cars: Car[] = [
    { value: 'volvo', viewValue: 'Volvo' },
    { value: 'saab', viewValue: 'Saab' },
    { value: 'mercedes', viewValue: 'Mercedes' },
  ];

  displayedColumns: string[] = ['cno', 'customer_name', 'contact', 'amount', 'pending', 'installment', 'status', 'remove'];
  data: { cno: number; customer_name: string; contact: string; amount: number; pending: boolean; installment: string; status: string }[] = [
    { cno: 1, customer_name: 'Alice', contact: '12345', amount: 100, pending: false, installment: 'Monthly', status: 'Active' },
    { cno: 2, customer_name: 'Bob', contact: '67890', amount: 200, pending: true, installment: 'Yearly', status: 'Pending' },
    // Add more data as necessary
  ];

  @Input() title: any;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }
}
