import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedAmountComponent } from './received-amount.component';

describe('ReceivedAmountComponent', () => {
  let component: ReceivedAmountComponent;
  let fixture: ComponentFixture<ReceivedAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceivedAmountComponent]
    });
    fixture = TestBed.createComponent(ReceivedAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
