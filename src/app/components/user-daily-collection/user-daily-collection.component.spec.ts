import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDailyCollectionComponent } from './user-daily-collection.component';

describe('UserDailyCollectionComponent', () => {
  let component: UserDailyCollectionComponent;
  let fixture: ComponentFixture<UserDailyCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDailyCollectionComponent]
    });
    fixture = TestBed.createComponent(UserDailyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
