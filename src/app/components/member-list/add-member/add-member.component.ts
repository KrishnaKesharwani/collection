import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent {

  @Input() title: any;
  @Input() subTitle: any;
  @Input() data: any;
  @Input() modal: any;

  @Output() deleteAction = new EventEmitter();
  memberForm!: FormGroup;
  constructor(public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {
    this.memberForm = this.fb.group({
      customerNo: [''],
      customerName: ['', Validators.required],
      mobile: ['', Validators.required],
      adharNumber: ['', Validators.required]
    });
  }

  save() {
    this.memberForm.markAllAsTouched()
    if (this.memberForm.valid) {
      // this.dialog.closeAll();
    }
  }
}
