import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectMoneyComponent } from './collect-money.component';

describe('CollectMoneyComponent', () => {
  let component: CollectMoneyComponent;
  let fixture: ComponentFixture<CollectMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectMoneyComponent]
    });
    fixture = TestBed.createComponent(CollectMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
