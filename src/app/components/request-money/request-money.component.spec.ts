import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMoneyComponent } from './request-money.component';

describe('RequestMoneyComponent', () => {
  let component: RequestMoneyComponent;
  let fixture: ComponentFixture<RequestMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestMoneyComponent]
    });
    fixture = TestBed.createComponent(RequestMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
