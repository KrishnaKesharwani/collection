import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface Transaction {
    item: string;
    cost: number;
}
@Component({
    selector: 'app-view-details',
    templateUrl: './view-details.component.html',
    styleUrls: ['./view-details.component.scss']
})




export class ViewDetailsComponent {

    dailCollectionDetails: any = [];
    data: any;

    constructor(@Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }) { }

    ngOnInit() {
        this.getViewDetails();
    }

    getViewDetails() {
        this.data = this.dataa.data;

    }
}
