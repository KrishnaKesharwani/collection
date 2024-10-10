import { Component, inject, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import Swal from 'sweetalert2';
// import { ViewDetailsComponent } from '../fixed-deposit/view-details/view-details.component';
import { CompanyHistoryComponent } from '../company-list/company-history/company-history.component';
import { ViewDetailsComponent } from '../company-list/view-details/view-details.component';
import { SuperAdminDashboardService } from 'src/app/services/dashboard/super-admin-dashboard.service';
import { ActionService } from 'src/app/services/action/action.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.scss']
})
export class SuperadminDashboardComponent {
  companyListData: any[] = [];
  filteredDataarray: any[] = [];
  readonly dialog = inject(MatDialog);
  noRecordsFound: boolean = false;
  loader = false;
  filterStateManagement: any;

  constructor(public _dashboardService: SuperAdminDashboardService, private actionService: ActionService, private _toastr: ToastrService, public _service: CompanyService) {
  }

  ngOnInit() {
    this.getExpeiredCompanyList();
  }
  // get filteredData() {
  //   return this.companyListData.filter(item =>
  //     item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }
  getExpeiredCompanyList() {
    this.loader = true;
    let obj = {
      upcoming_expire: 1
    }
    this._service.getExpeiredCompanyList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        if (response) {
          this.companyListData = response.data;
          this.filteredDataarray= this.companyListData;
          this.loader = false;
        }
        else {
          this.companyListData = [];
          this.filteredDataarray= this.companyListData;         
          this.loader = false;
        }
      }
    })
  }

  openDialogCompanyHistory(id: any) {
    const dialogRef = this.dialog.open(CompanyHistoryComponent, {
      data: {
        title: 'Company Plan History Details',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openDialogVieDetails(data: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      data: {
        title: 'Company Details',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openDialogStatus(enterAnimationDuration: string, exitAnimationDuration: string, data?: any): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'delete_popup',
      data: {
        title: 'Are you sure?',
        subTitle: data && data.status === 'active'
          ? 'You want to inactivate company status!'
          : 'You want to activate company status!'
      }
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.updateStatus(data);
    });
  }

  updateStatus(data: any) {
    let obj = {
      company_id: data.id,
      status: data.status == 'active' ? 'inactive' : 'active'
    }

    this._service.changeStatus(obj).subscribe((data: any) => {
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: 'Success',
          text: 'Company Status Updated!',
          showConfirmButton: true,
          timer: 1500
        });
      }

    });
    this.getExpeiredCompanyList();
  }
  searchText: string = '';
  // allDataArray: any = [];
  // allDataArrayInitialState: any = [];
  // dataDisplay: any = [];
  // initialDataArray: any = [];
  // listDisplayArray: any = [];

  // search(event: Event) {
  //   const inputValue = (event.target as HTMLInputElement).value;
  //   this.searchText = inputValue;
  //   this.createDisplayArray();
  // }
  // onInputChange(event: Event): void {
  //   const inputValue = (event.target as HTMLInputElement).value;
  //   console.log(inputValue);
  // }
  // dataArray(data: { [x: string]: any; }, dataDisplay: any[], row: any, rowAdd: any = true) {
  //   Object.keys(data)?.forEach((f: any) => {
  //     const findInList = this.listDisplayArray.find((listf: { displayName: any; }) => listf?.displayName === f);
  //     if (findInList || f) {
  //       if (data[f]?.element === 'CUSTOM_ARRAY' || data[f]?.element === 'CUSTOM') {
  //         const checkDataLength = data[f]?.data?.length;
  //         data[f]?.data?.forEach((dataItem: any) => {
  //           rowAdd = false;
  //           if (checkDataLength > 1) {
  //             this.dataArray(dataItem, dataDisplay, { ...row });
  //           } else {
  //             this.dataArray(dataItem, dataDisplay, row);
  //           }
  //         });

  //       } else {
  //         data[f].key = f;
  //         this.addData(data[f], dataDisplay, row);
  //       }
  //     }
  //   });
  //   if (rowAdd) {
  //     dataDisplay.push(row);
  //   }
  // }
  addData(arg0: any, dataDisplay: any, row: any) {
    throw new Error('Method not implemented.');
  }
  // createDisplayArray() {
  //   this.companyListData?.forEach((val: any) => {
  //     val.subTitleList = [];
  //     const dataDisplay: any[] = [];
  //     //  let array = this.dataArray(val?.data,dataDisplay);
  //     const row: any = {};
  //     const key = this.dataArray(val?.companyListData, dataDisplay, row);
  //     let columnNames = this.listDisplayArray.map((item: { displayName: any; }) => item.displayName);
  //     dataDisplay?.forEach((f: any) => {
  //       f.id = val?.id
  //       f.formData = val
  //       let rowMatched = this.searchText ? false : true;
  //       for (let index = 0; index < columnNames.length; index++) {
  //         let column = columnNames[index];
  //         // check search string
  //         if (f[column] && this.searchText && f[column]?.toString().toLowerCase().includes(this.searchText?.toLowerCase())) {
  //           rowMatched = true;
  //         }

  //         //do filter validation
  //         if (this.filterStateManagement[column]?.length &&
  //           !this.filterStateManagement[column]?.some((item: any) =>
  //             String(item)?.toLowerCase() === String(f[column])?.toLowerCase())) {
  //           rowMatched = false;
  //           break;
  //         }
  //       }
  //       if (rowMatched) {
  //         this.allDataArray.push(f);
  //         this.allDataArrayInitialState.push(f);
  //       }
  //       this.initialDataArray.push(f);
  //     });

  //     this.dataDisplay = dataDisplay;
  //   });

  // }

  searchTerm: string = '';

  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    this.filteredData();
  }

  filteredData() {
    this.filteredDataarray = this.companyListData.filter(item =>
      item.company_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.owner_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.advance_amount.includes(this.searchTerm) ||
      item.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.mobile.includes(this.searchTerm)   
    );
  }
  currentSortField: string | undefined;
  SORTING_ORDER = { RESET: 0, ASC: 1, DESC: 2 }
  currentSortOrder: number = this.SORTING_ORDER.RESET;
  sortData(disClick: any, field: string, sortingOrder: any) {
    // if (this.currentSortOrder == sortingOrder) {
    //   this.companyListData = JSON.parse(JSON.stringify(this.companyListData));
    //   this.currentSortOrder = 0;
    //   return;
    // }
    // // divElement?.classList.contains('your-class-name')
    // // if (!this.enableSorting) {
    // //   return;
    // // }
    // this.currentSortOrder = sortingOrder;
    // if (this.currentSortField !== field) {
    //   this.currentSortField = field;
    // }

    // if (this.currentSortOrder == this.SORTING_ORDER.RESET) {
    //   this.companyListData = JSON.parse(JSON.stringify(this.companyListData));
    //   return;
    // }

    this.companyListData.sort((a: { [x: string]: string; }, b: { [x: string]: string; }) => {
      let aValue = a[field] || '';
      let bValue = b[field] || '';

      if (typeof aValue === 'string' || typeof bValue === 'string') {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }
      if (aValue < bValue) {
        return this.currentSortOrder === this.SORTING_ORDER.ASC ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.currentSortOrder === this.SORTING_ORDER.ASC ? 1 : -1;
      }
      return 0;
    });
  }
}
