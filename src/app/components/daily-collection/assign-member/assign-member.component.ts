import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-assign-member',
  templateUrl: './assign-member.component.html',
  styleUrls: ['./assign-member.component.css']
})
export class AssignMemberComponent {
  @Input() title: any;

  @Output() deleteAction = new EventEmitter();

  constructor(private dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {
    this.dropdownService.setOptions(['Option A1', 'Option A2', 'Option A3']);
  }
}
