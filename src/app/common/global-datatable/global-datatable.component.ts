import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import DataTable from 'datatables.net'; // Import the DataTable functionality
import DataTables from 'datatables.net';
import { ActionData, ActionService } from 'src/app/services/action/action.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-global-datatable',
  templateUrl: './global-datatable.component.html',
  styleUrls: ['./global-datatable.component.scss']
})
export class GlobalDatatableComponent {
  @Input() data: any = [];
  @Input() columns: any[] = [];
  @ViewChild('dataTable', { static: false }) table!: ElementRef;
  @Output() actionSelected = new EventEmitter<{ action: string, row: any }>();
  @Output() actionTriggered = new EventEmitter<ActionData>();
  // dtOptions: any = {};  // Use DataTables.Settings for type definition
  @Input() actions: Array<{ action: string; label: string; icon: string }> = [];

  constructor(public actionService: ActionService) { }

  myData: any[] = [
    { name: 'John Doe', age: 30, job: 'Developer' },
    { name: 'Jane Doe', age: 25, job: 'Designer' },
    { name: 'Max Smith', age: 40, job: 'Manager' },
  ];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      // Enable searching and sorting
      searching: true,
      ordering: true,
      columns: [
        { title: 'Name', data: 'name' },
        { title: 'Age', data: 'age' },
        { title: 'Job', data: 'job' }
      ]
    };
    this.dtTrigger.next(null);
  }
  ngOnDestroy(): void {
    // Unsubscribe from the trigger
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  ngOnChanges(): void {
    if (this.table) {
      this.initializeDataTable();
    }
  }

  private initializeDataTable() {
    // Destroy the previous instance if it exists
    // if ($.fn.dataTable.isDataTable(this.table.nativeElement)) {
    //   $(this.table.nativeElement).DataTable().destroy();
    // }
    // this.dtOptions = {
    //   data: this.data,
    //   columns: this.columns.map(column => ({
    //     data: column.prop,
    //     title: column.name,
    //     orderable: column.orderable
    //   })),
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   searching: true, // Enable searching
    //   destroy: true,
    //   ordering: true,
    // };
    // $(this.table.nativeElement).DataTable(this.dtOptions);
  }

  onAction(actionData: ActionData) {
    this.actionService.setAction(actionData);

    this.actionTriggered.emit(actionData);
  }


}
