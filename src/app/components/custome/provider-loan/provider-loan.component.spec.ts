import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderLoanComponent } from './provider-loan.component';

describe('ProviderLoanComponent', () => {
  let component: ProviderLoanComponent;
  let fixture: ComponentFixture<ProviderLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderLoanComponent]
    });
    fixture = TestBed.createComponent(ProviderLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
