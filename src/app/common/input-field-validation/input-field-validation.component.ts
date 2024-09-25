import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonComponentsModule } from '../common-components.module';

@Component({
  selector: 'app-input-field-validation',
  templateUrl: './input-field-validation.component.html',
  styleUrls: ['./input-field-validation.component.css']
})


export class InputFieldValidationComponent {
  @Input() form: any;
  @Input() formType: any = true;
  @Input() control: any;
  @Input() displayMsg: any;
  @Input() patternMsg: any;
  @Input() maxLength: any;
  @Input() customErrorPatternMsg: any;
  @Input() customErrorDisplayMsg: any;
  @Input() customType: any;
  @Input() className: any = 'bottom_error_msg';

  @Input() key: any
  minLength: any;
  constructor(private fb: FormBuilder) {

  }
}
