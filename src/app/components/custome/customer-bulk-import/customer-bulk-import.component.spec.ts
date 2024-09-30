import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBulkImportComponent } from './customer-bulk-import.component';

describe('CustomerBulkImportComponent', () => {
  let component: CustomerBulkImportComponent;
  let fixture: ComponentFixture<CustomerBulkImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerBulkImportComponent]
    });
    fixture = TestBed.createComponent(CustomerBulkImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
