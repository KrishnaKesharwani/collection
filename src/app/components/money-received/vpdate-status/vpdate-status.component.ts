import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-vpdate-status',
  templateUrl: './vpdate-status.component.html',
  styleUrls: ['./vpdate-status.component.scss']
})
export class VpdateStatusComponent {
  @Input() title: any;
  loading = false;
  @Output() deleteAction = new EventEmitter();

  constructor(private dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {
    this.dropdownService.setOptions('member', ['Allot Members', 'Roshan Kanojiya', 'Bhaijan']);
  }
}
