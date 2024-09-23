import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerListComponent } from './edit-customer-list.component';

describe('EditCustomerListComponent', () => {
  let component: EditCustomerListComponent;
  let fixture: ComponentFixture<EditCustomerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCustomerListComponent]
    });
    fixture = TestBed.createComponent(EditCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
