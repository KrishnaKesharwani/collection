import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMemberComponent } from './change-member.component';

describe('ChangeMemberComponent', () => {
  let component: ChangeMemberComponent;
  let fixture: ComponentFixture<ChangeMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeMemberComponent]
    });
    fixture = TestBed.createComponent(ChangeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
