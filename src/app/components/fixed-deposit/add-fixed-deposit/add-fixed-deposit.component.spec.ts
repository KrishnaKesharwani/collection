import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFixedDepositComponent } from './add-fixed-deposit.component';

describe('AddFixedDepositComponent', () => {
  let component: AddFixedDepositComponent;
  let fixture: ComponentFixture<AddFixedDepositComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFixedDepositComponent]
    });
    fixture = TestBed.createComponent(AddFixedDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
