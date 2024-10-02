import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent {

  @Input() title: any;
  @Input() subTitle: any;
  @Input() data: any;
  @Input() modal: any;

  @Output() deleteAction = new EventEmitter();
  memberForm!: FormGroup;
  member_Id!: 1;
  constructor(private dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {
    this.memberForm = this.fb.group({
      memberNo: ['', Validators.required],
      memberName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      adharNumber: ['', Validators.required],
      joinDate: ['', Validators.required],
      memberLoginId: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      status: ['']
    });

    this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }

  selectedFile: File | null = null;

  onFileChange(file: File | null): void {
    this.selectedFile = file;
    // Handle the file as needed
    console.log(file);
  }

  save() {
    this.memberForm.markAllAsTouched()
    if (this.memberForm.valid) {
      // this.dialog.closeAll();
    }
  }

  update() {
    this.memberForm.markAllAsTouched()
    if (this.memberForm.valid) {
      // this.dialog.closeAll();
    }
  }
}
