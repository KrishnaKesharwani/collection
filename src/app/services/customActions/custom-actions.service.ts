import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomActionsService {
  filteredDataarray: any[] = [];
  isAsc: boolean = true;

  constructor() { }

  sortData(column: string, responseData: any) {
    console.log(column, responseData)

    this.filteredDataarray = responseData.sort((a: any, b: any) => {
      const aValue = a[column];
      const bValue = b[column];
      if (this.isAsc) {
        if (aValue > bValue) return 1;
        if (aValue < bValue) return -1;
        return 0;
      }
      else {
        if (aValue < bValue) return 1;
        if (aValue > bValue) return -1;
        return 0;
      }
    });
    this.isAsc = !this.isAsc;

    return this.filteredDataarray;
  }
}
