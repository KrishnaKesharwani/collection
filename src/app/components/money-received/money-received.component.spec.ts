import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyReceivedComponent } from './money-received.component';

describe('MoneyReceivedComponent', () => {
  let component: MoneyReceivedComponent;
  let fixture: ComponentFixture<MoneyReceivedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoneyReceivedComponent]
    });
    fixture = TestBed.createComponent(MoneyReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
