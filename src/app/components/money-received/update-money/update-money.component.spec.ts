import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMoneyComponent } from './update-money.component';

describe('UpdateMoneyComponent', () => {
  let component: UpdateMoneyComponent;
  let fixture: ComponentFixture<UpdateMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMoneyComponent]
    });
    fixture = TestBed.createComponent(UpdateMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
