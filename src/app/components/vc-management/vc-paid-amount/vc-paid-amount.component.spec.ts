import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcPaidAmountComponent } from './vc-paid-amount.component';

describe('VcPaidAmountComponent', () => {
  let component: VcPaidAmountComponent;
  let fixture: ComponentFixture<VcPaidAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VcPaidAmountComponent]
    });
    fixture = TestBed.createComponent(VcPaidAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
