import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDepositComponent } from './new-deposit.component';

describe('NewDepositComponent', () => {
  let component: NewDepositComponent;
  let fixture: ComponentFixture<NewDepositComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDepositComponent]
    });
    fixture = TestBed.createComponent(NewDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
