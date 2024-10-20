import { Component, EventEmitter, forwardRef, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonComponentService } from '../common-component.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
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
  @Input() form!:FormGroup;
  @Input() jsonKey: any;
  @Input() key:any;
  @Input() field!: string;
  @Input() optionArray:any=[];
  @Input() arrayType:any="STRING_TYPE"
  // @Input() formControlName!: string;
  // @Input() name!: string;
  value!: string;
  options: string[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  constructor(private dropdownService: CommonComponentService, @Inject(MAT_DIALOG_DATA) public data: { field_value: string, value: string }) { }

  ngOnInit() {
    this.dropdownService.dropdownOptions$.subscribe(options => {
      this.options = options[this.key] || [];
    });
  }


  onSelectionChange(event: string) {
    this.selectionChange.emit(event); // Emit only the selected value, not the event object
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
