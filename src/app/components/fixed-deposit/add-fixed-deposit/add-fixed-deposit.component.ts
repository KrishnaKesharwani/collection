import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-fixed-deposit',
  templateUrl: './add-fixed-deposit.component.html',
  styleUrls: ['./add-fixed-deposit.component.css']
})
export class AddFixedDepositComponent {

  @Input() title: any;
  @Output() deleteAction = new EventEmitter();
  fixedDepositForm!: FormGroup;
  constructor(public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }


  ngOnInit() {
    this.fixedDepositForm = this.fb.group({
      customer_name: ['', Validators.required],
      fixed_deposit_name: ['', Validators.required],
      moblie: ['', Validators.required],
      details: [''],
      email: [''],
      status: [''],
      password: [''],
      address: [''],
      adhar_front: [''],
      adhar_back: [''],
      adhar_number: ['', Validators.required],
      start_amount: ['', Validators.required],
      end_amount: [''],
      start_date: [''],
      end_date: ['']
    });
  }

  save() {
    this.fixedDepositForm.markAllAsTouched()
    if (this.fixedDepositForm.valid) {
      // this.dialog.closeAll();
    }
  }

  selectedFile: File | null = null;

  onFileChange(file: File | null): void {
    this.selectedFile = file;
    // Handle the file as needed
    console.log(file);
  }

  selectedFile2: File | null = null;

  onFileChange2(file: File | null): void {
    this.selectedFile2 = file;
    // Handle the file as needed
    console.log(file);
  }
}