import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidMoneyComponent } from './paid-money.component';

describe('PaidMoneyComponent', () => {
  let component: PaidMoneyComponent;
  let fixture: ComponentFixture<PaidMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaidMoneyComponent]
    });
    fixture = TestBed.createComponent(PaidMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
