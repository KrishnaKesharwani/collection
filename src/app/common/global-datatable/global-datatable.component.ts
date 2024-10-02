import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import DataTable from 'datatables.net'; // Import the DataTable functionality
import DataTables from 'datatables.net';

@Component({
  selector: 'app-global-datatable',
  templateUrl: './global-datatable.component.html',
  styleUrls: ['./global-datatable.component.scss']
})
export class GlobalDatatableComponent {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @ViewChild('dataTable', { static: false }) table!: ElementRef;

  dtOptions: any = {};  // Use DataTables.Settings for type definition

  constructor() { }

  ngAfterViewInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };

    $(this.table.nativeElement).DataTable(this.dtOptions);
  }
}
