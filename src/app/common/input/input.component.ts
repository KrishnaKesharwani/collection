import { Component, EventEmitter, forwardRef, Inject, Input, Output, ViewChild } from '@angular/core';
import { CommonComponentService } from '../common-component.service';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent {

  @Input() key!: string;
  @Input() field!: string;
  // @Input() formControlName!: string;
  // @Input() name!: string;

  constructor(private dropdownService: CommonComponentService,) { }

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
  @Input() isDateField: boolean = false;
  @Input() matDatepicker: boolean = false;
  @Input() className: string = 'bottom_error_msg';
  @ViewChild('picker') picker!: MatDatepicker<any>; // Declare the datepicker reference

  @Input() keyValidation!: string
  minLength: any;

  get control() {
    return this.form.get(this.key) as FormControl;;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };


}
