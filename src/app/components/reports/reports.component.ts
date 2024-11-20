import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import Swal from 'sweetalert2';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { DownloadReportComponent } from './download-report/download-report.component';
import { BackupListService } from 'src/app/services/backupList/backup-list.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  offer_modalaction: any;
  usertype: any;
  company_id: any;
  // customerData: any[] = [];
  filteredDataarray: any[] = [];
  loader = false;
  backupListData: any[] = [];

  constructor(public _service: BackupListService, public _customActionService: CustomActionsService, public dialog: MatDialog, private actionService: ActionService) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.getReportList();
  }

  getReportList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id
    }
    this._service.getbackupList(obj).subscribe((data: any) => {
      console.log(data.message);
      this.backupListData = data.message;
      this.filteredDataarray = this.backupListData;
      this.loader = false;
    })
  }

  openDialogBackupnow(data: any) {
    const dialogRef = this.dialog.open(DownloadReportComponent, {
      disableClose: true,
      data: {
        title: 'Download Report',
        data: data
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getReportList();
      }
    });
  }

  isAsc: boolean = true;
  sortTableData(column: string) {
    if (this.isAsc) {
      this.isAsc = false;
    } else {
      this.isAsc = true;
    }
    this.filteredDataarray = this._customActionService.sortData(column, this.backupListData);
  }

  searchColumns: any[] = ['name','active', 'inactive', 'last_backup_date'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.backupListData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
  }
}
