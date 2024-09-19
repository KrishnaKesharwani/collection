import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  get isValid() {
    return this.form.controls[this.field.name].valid;
  }

  get isDirty() {
    return this.form.controls[this.field.name].dirty;
  }
}
