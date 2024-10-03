import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCollectListComponent } from './daily-collect-list.component';

describe('DailyCollectListComponent', () => {
  let component: DailyCollectListComponent;
  let fixture: ComponentFixture<DailyCollectListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyCollectListComponent]
    });
    fixture = TestBed.createComponent(DailyCollectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
