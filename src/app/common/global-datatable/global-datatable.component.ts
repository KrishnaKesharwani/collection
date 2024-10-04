import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import DataTable from 'datatables.net'; // Import the DataTable functionality
import DataTables from 'datatables.net';
import { ActionData, ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-global-datatable',
  templateUrl: './global-datatable.component.html',
  styleUrls: ['./global-datatable.component.scss']
})
export class GlobalDatatableComponent {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @ViewChild('dataTable', { static: false }) table!: ElementRef;
  @Output() actionSelected = new EventEmitter<{ action: string, row: any }>();
  @Output() actionTriggered = new EventEmitter<ActionData>();
  dtOptions: any = {};  // Use DataTables.Settings for type definition
  @Input() actions: Array<{ action: string; label: string; icon: string }> = [];
  constructor(public actionService: ActionService) { }

  ngAfterViewInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };

    $(this.table.nativeElement).DataTable(this.dtOptions);
  }

  onAction(actionData: ActionData) {
    this.actionService.setAction(actionData);
    this.actionTriggered.emit(actionData);
  }
}
