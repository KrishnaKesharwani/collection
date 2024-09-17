import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCollectionComponent } from './daily-collection.component';

describe('DailyCollectionComponent', () => {
  let component: DailyCollectionComponent;
  let fixture: ComponentFixture<DailyCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyCollectionComponent]
    });
    fixture = TestBed.createComponent(DailyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
