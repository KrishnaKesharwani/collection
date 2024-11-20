import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDepositRequestMoneyComponent } from './customer-deposit-request-money.component';

describe('CustomerDepositRequestMoneyComponent', () => {
  let component: CustomerDepositRequestMoneyComponent;
  let fixture: ComponentFixture<CustomerDepositRequestMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerDepositRequestMoneyComponent]
    });
    fixture = TestBed.createComponent(CustomerDepositRequestMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
