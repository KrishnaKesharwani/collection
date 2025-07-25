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


  filteredData(responseData: any, searchTerm: string = '', filterColumnName: any[] = []) {
    this.filteredDataarrayForSearch = responseData.filter((item: any) => {
      for (let i = 0; i < filterColumnName?.length; i++) {
        const columnName = filterColumnName[i];
        if (item[columnName] && typeof item[columnName] === 'string') {
          if (item[columnName].toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    });

    return this.filteredDataarrayForSearch;
  }

  // upcomig code
  // removeVcMember(data: any) {
  //   const index = this.filteredDataarray.findIndex(item => item.id === data.id);
  //   if (index !== -1) {
  //     this.filteredDataarray.splice(index, 1);
  //   }
  // }
}
