import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceMoneyComponent } from './advance-money.component';

describe('AdvanceMoneyComponent', () => {
  let component: AdvanceMoneyComponent;
  let fixture: ComponentFixture<AdvanceMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvanceMoneyComponent]
    });
    fixture = TestBed.createComponent(AdvanceMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
