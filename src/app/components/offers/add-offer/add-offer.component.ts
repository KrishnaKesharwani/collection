import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  loading: boolean = false;
  constructor(public dialogRef: MatDialogRef<AddOfferComponent>, public router: Router, public _tostr: ToastrService, public _service: OffersService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.offerForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      image: ['../../../assets/imgs/no-images.jpg'],
      default_offer: ['']
    });
    this.offer_id = this.dataa.data.id;
    if (this.dataa?.data) {
      this.offerView();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  offerView() {
    this.offerForm.patchValue({
      ...this.dataa.data,
      // member_login_id: this.dataa.data.member_no,
      // status: this.dataa?.data?.status, 
      // password: this.dataa.data.user?.password_hint
    });
  }

  selectedFile: File | null = null;

  onFileChange(file: File | null): void {
    this.selectedFile = file;
    // Handle the file as needed
  }

  saveDetails() {
    if (this.offer_id) {

      if (this.offerForm.valid) {
        this.loading = true;
        const formData = new FormData();
        Object.keys(this.offerForm.value).forEach(key => {
          formData.append(key, this.offerForm.value[key]);
        });
        if (!this.selectedFile) {
          formData.delete('image');
        }
        formData.append('company_id', this.company_id);
        formData.append('offer_id', this.offer_id);
        // let obj = {
        //   offer_id: this.offer_id,
        //   company_id: this.company_id,
        //   ...this.offerForm.value
        // }
        this._service.update(formData).subscribe((data: any) => {
          console.log(data)
          this._tostr.success(data.message, "Success");
          this.loading = false;
          this.dialogRef.close(true);
          this.router.navigate(['/offers']);
        })

      } else {
        this.offerForm.markAllAsTouched()
      }
    } else {
      if (this.offerForm.valid) {
        this.loading = true;
        const formData = new FormData();
        Object.keys(this.offerForm.value).forEach(key => {
          formData.append(key, this.offerForm.value[key]);
        });
        if (!this.selectedFile) {
          formData.delete('image');
        }
        formData.append('company_id', this.company_id);
        this._service.create(formData).subscribe((data: any) => {
          console.log(data);
          this._tostr.success(data.message, "Success");
          this.loading = false;
          this.dialogRef.close(true);
          this.router.navigate(['/offers']);
        })

      } else {
        this.offerForm.markAllAsTouched()
      }
    }

  }



}
