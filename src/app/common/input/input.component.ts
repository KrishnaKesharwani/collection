import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonComponentService } from '../common-component.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() key!: string;
  @Input() field!: string;
  // @Input() formControlName!: string;
  // @Input() name!: string;

  constructor(private dropdownService: CommonComponentService, @Inject(MAT_DIALOG_DATA) public data: { field_value: string, value: string }) { }

  @Input() label: string = '';
  @Input() isRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  @Input() form!: FormGroup;
  @Input() formType: any = true;
  // @Input() control: any;
  @Input() displayMsg!: string;
  @Input() patternMsg!: string;
  @Input() maxLength: any;
  @Input() customErrorPatternMsg!: string;
  @Input() customErrorDisplayMsg!: string;
  @Input() customType!: string;
  @Input() isDateField!: boolean;
  @Input() matDatepicker!: boolean;
  @Input() className: string = 'bottom_error_msg';

  @Input() keyValidation!: string
  minLength: any;

  get control() {
    return this.form.get(this.key) as FormControl;;
  }

}
