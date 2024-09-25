import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonComponentService } from '../common-component.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dropdwon',
  templateUrl: './dropdwon.component.html',
  styleUrls: ['./dropdwon.component.scss']
})



export class DropdwonComponent {
  options: string[] = [];
  @Input() title: any;
  selectedValue: string | undefined;

  constructor(private dropdownService: CommonComponentService, @Inject(MAT_DIALOG_DATA) public data: { field_value: string }) { }

  ngOnInit() {
    this.dropdownService.dropdownOptions$.subscribe((options) => {
      this.options = options;
      if (options.length > 0) {
        this.selectedValue = options[0]; // Set a default value
      }
    });
  }
}
