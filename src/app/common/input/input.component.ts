import { Component, EventEmitter, forwardRef, Inject, Input, Output, ViewChild } from '@angular/core';
import { CommonComponentService } from '../common-component.service';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
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
  date: any;
  // @Input() formControlName!: string;
  // @Input() name!: string;

  constructor(public dropdownService: CommonComponentService,) { }

  @Input() label: string = '';
  @Input() isRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: Date | string | null = null;;
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
  @Input() readonly: boolean = false;
  @Input() isDateField: boolean = false;
  @Input() matDatepicker: boolean = false;
  @Input() className: string = 'bottom_error_msg';
  @ViewChild('picker') picker!: MatDatepicker<any>; // Declare the datepicker reference

  @Input() keyValidation!: string
  formattedDate: string = '';
  // @Output() dateChange = new EventEmitter<any>();
  minLength: any;

  get displayValue(): string | undefined {
    if (this.value instanceof Date) {
      return this.formatDate(this.value);  // Format date if it's a Date object
    }
    return this.value as string;  // Otherwise return the string value
  }
  formattedDate2: string = '';

  onDateChange2(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;

    // let date=new date(dateGIven)
    if (selectedDate) {
      this.formattedDate = selectedDate.toLocaleDateString('en-US');
    }
  }
  onDateChange(event?: MatDatepickerInputEvent<Date>) {

    // const selectedDate = new Date(event?.value);
    // this.formattedDate = selectedDate.toLocaleDateString('en-US');

    this.date = event?.value;
    if (this.date) {
      const newDate = new Date(this.date);
      const selectedDate = new Date(this.date);
      this.formattedDate = selectedDate.toLocaleDateString('en-US');
      // this.form.controls['image'].setValue(reader.result);
      console.log('Formated Date : ', this.formattedDate);
      // this.formattedDate = this.getApidateFormatSet(this.formattedDate);  
      const m = newDate.getMonth() + 1;
      let year = this.date.getFullYear();
      let day = this.date.getDate();
      this.formattedDate = day + '/' + m + '/' + year;
      this.valueChange.emit(this.formattedDate);
      // this.control.value(this.formattedDate);
      // return new Date(newDate.getFullYear() + '-' + m + '-' + newDate.getDate() + ' 00:00:00');
      // this.valueChange.emit(newDate.getFullYear() + '-' + m + '-' + newDate.getDate() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds());
      // this.valueChange.emit(this.date);  // Emit the Date object when a date is picked
    } else {
      this.valueChange.emit('');  // Emit null if the date is cleared
    }
  }
  // onDateFormatChange(dis: any) {
  //   setTimeout(() => {

  //     // this.date = event?.value;
  //     var getDate = dis['start_date'].value;
  //     this.formattedDate = getDate.toLocaleDateString('en-US');
  //   }, 1000);

  // }
  getApidateFormatSet(date: any) {
    const newDate = new Date(this.date);

    let month = date.getMonth();
    let year = date.getFullYear();
    let day = date.getDate();
    return (day + '/' + month + '/' + year);
    // return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + ' ' +
    // ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ensure two-digit month
    const day = ('0' + date.getDate()).slice(-2); // Ensure two-digit day
    return `${year}-${month}-${day}`;
  }

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
