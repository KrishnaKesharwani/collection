import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-change-member',
  templateUrl: './change-member.component.html',
  styleUrls: ['./change-member.component.scss']
})
export class ChangeMemberComponent {
  changeMemberForm!: FormGroup;
  @Input() title: any;
  loading = false;
  @Output() deleteAction = new EventEmitter();

  constructor(public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {
    this.dropdownService.setOptions('member', ['Allot Members', 'Roshan Kanojiya', 'Bhaijan']);
  }
}
