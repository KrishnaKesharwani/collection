import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-member-list',
  templateUrl: './edit-member-list.component.html',
  styleUrls: ['./edit-member-list.component.scss']
})
export class EditMemberListComponent {
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
      memberNo: [''],
      memberName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      adharNumber: ['', Validators.required],
      joinDate: ['', Validators.required],
      memberLoginId: ['', Validators.required],
      password: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  update() {
    this.memberForm.markAllAsTouched()
    if (this.memberForm.valid) {
      // this.dialog.closeAll();
    }
  }

  selectedFile: File | null = null;

  onFileChange(file: File | null): void {
    this.selectedFile = file;
    // Handle the file as needed
    console.log(file);
  }
}
