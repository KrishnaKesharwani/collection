import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionForDepositComponent } from './action-for-deposit.component';

describe('ActionForDepositComponent', () => {
  let component: ActionForDepositComponent;
  let fixture: ComponentFixture<ActionForDepositComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionForDepositComponent]
    });
    fixture = TestBed.createComponent(ActionForDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
