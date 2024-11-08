import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.scss']
})
export class ViewOfferComponent {
  offer_detials: any = [];
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }) { }

  ngOnInit() {
    this.viewOfferDetails();
  }

  viewOfferDetails() {
    this.data = this.dataa.data;

  }
}
