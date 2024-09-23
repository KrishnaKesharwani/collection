import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFixedDepositComponent } from './edit-fixed-deposit.component';

describe('EditFixedDepositComponent', () => {
  let component: EditFixedDepositComponent;
  let fixture: ComponentFixture<EditFixedDepositComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFixedDepositComponent]
    });
    fixture = TestBed.createComponent(EditFixedDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
