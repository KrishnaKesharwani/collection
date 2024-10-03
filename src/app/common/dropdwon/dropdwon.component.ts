import { Component, forwardRef, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonComponentService } from '../common-component.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dropdwon',
  templateUrl: './dropdwon.component.html',
  styleUrls: ['./dropdwon.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdwonComponent),
      multi: true
    }
  ]
})



export class DropdwonComponent {
  @Input() key!: string;
  @Input() field!: string;
  // @Input() formControlName!: string;
  // @Input() name!: string;
  value!: string;
  options: string[] = [];

  constructor(private dropdownService: CommonComponentService, @Inject(MAT_DIALOG_DATA) public data: { field_value: string, value: string }) { }

  ngOnInit() {
    this.dropdownService.dropdownOptions$.subscribe(options => {
      this.options = options[this.key] || [];
    });
  }

  onChange = (value: string) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
