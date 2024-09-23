import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MaterialModule } from 'src/app/material.module';
@Component({
  selector: 'app-dropdwon',
  templateUrl: './dropdwon.component.html',
  styleUrls: ['./dropdwon.component.css']
})



export class DropdwonComponent {
  @Input() field: any = {};
  @Input() name: any = {};
  @Input() needToShowHeader: boolean = true;
  @Input() form!: FormGroup;

  @Input() formCon: any;


  constructor() {
  }
  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  // matcher = new MyErrorStateMatcher();
}
