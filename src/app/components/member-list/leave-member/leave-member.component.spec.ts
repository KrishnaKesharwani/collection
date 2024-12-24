import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMemberComponent } from './leave-member.component';

describe('LeaveMemberComponent', () => {
  let component: LeaveMemberComponent;
  let fixture: ComponentFixture<LeaveMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveMemberComponent]
    });
    fixture = TestBed.createComponent(LeaveMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
