import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonComponentService } from '../common-component.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() key!: string;
  @Input() field!: string;
  // @Input() formControlName!: string;
  // @Input() name!: string;

  constructor(private dropdownService: CommonComponentService, @Inject(MAT_DIALOG_DATA) public data: { field_value: string, value: string }) { }

  @Input() label: string = '';
  @Input() isRequired: boolean = false;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onChange(value: string) {
    this.valueChange.emit(value);
  }
}
