import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentHistoryComponent } from './installment-history.component';

describe('InstallmentHistoryComponent', () => {
  let component: InstallmentHistoryComponent;
  let fixture: ComponentFixture<InstallmentHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallmentHistoryComponent]
    });
    fixture = TestBed.createComponent(InstallmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
