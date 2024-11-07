import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { OffersService } from 'src/app/services/offers/offers.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent {


  @Input() title: any;
  @Input() subTitle: any;
  @Input() data: any;
  @Input() modal: any;

  @Output() deleteAction = new EventEmitter();
  offerForm!: FormGroup;
  offer_id: any;
  company_id: any;
  constructor(public _service: OffersService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {

    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.offerForm = this.fb.group({
      name: ['', Validators.required],
      details: [''],
      type: [''],
      status: [''],
      image: [''],
      default_offer: ['']
    });

    // this.dropdownService.setOptions('offers', ['Offers', 'Schemes']);
    // this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }

  selectedFile: File | null = null;

  onFileChange(file: File | null): void {
    this.selectedFile = file;
    // Handle the file as needed
  }

  save() {
    if (this.offer_id) {
      if (this.offerForm.valid) {

        let obj = {
          offer_id: this.offer_id,
          company_id: this.company_id,
          ...this.offerForm.value
        }
        this.dialog.closeAll();
      } else {
        this.offerForm.markAllAsTouched()
      }
    } else {
      if (this.offerForm.valid) {

        let obj = {
          company_id: this.company_id,
          ...this.offerForm.value
        }
        this._service.create(obj).subscribe((data: any) => {
          console.log(data)
        })
        this.dialog.closeAll();
      } else {
        this.offerForm.markAllAsTouched()
      }
    }

  }



}
