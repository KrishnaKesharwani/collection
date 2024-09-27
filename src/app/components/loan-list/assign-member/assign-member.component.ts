import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-assign-member',
  templateUrl: './assign-member.component.html',
  styleUrls: ['./assign-member.component.scss']
})
export class AssignMemberComponent {

  @Input() title: any;

  @Output() deleteAction = new EventEmitter();

  constructor(private dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {
    this.dropdownService.setOptions(['Allot Members', 'Roshan Kanojiya', 'Bhaijan']);
  }

  save() { }
}
