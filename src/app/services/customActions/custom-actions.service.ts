import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomActionsService {
  filteredDataarray: any[] = [];
  filteredDataarrayForSearch: any[] = [];
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

  filteredData(responseData: any, searchTerm: string = '') {

    this.filteredDataarrayForSearch = responseData.filter((item: any) =>
      item.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.advance_amount.includes(searchTerm) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile.includes(searchTerm)
    );
    console.log(this.filteredDataarrayForSearch);

    return this.filteredDataarrayForSearch;
  }
}
