import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent {

  @Input() title: any;
  @Input() subTitle: any;
  @Input() data: any;
  @Input() modal: any;

  @Output() deleteAction = new EventEmitter();
  offerForm!: FormGroup;
  constructor(private dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {
    this.offerForm = this.fb.group({

      offerName: ['', Validators.required],

      detail: ['']
    });

    this.dropdownService.setOptions('offers', ['Offers', 'Schemes']);
    this.dropdownService.setOptions('statuses', ['Active', 'Inactive', 'Pending']);
  }

  selectedFile: File | null = null;

  onFileChange(file: File | null): void {
    this.selectedFile = file;
    // Handle the file as needed
    console.log(file);
  }

  update() {
    this.offerForm.markAllAsTouched()
    if (this.offerForm.valid) {
      // this.dialog.closeAll();
    }
  }
}
