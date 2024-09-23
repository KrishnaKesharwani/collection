import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberListComponent } from './edit-member-list.component';

describe('EditMemberListComponent', () => {
  let component: EditMemberListComponent;
  let fixture: ComponentFixture<EditMemberListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMemberListComponent]
    });
    fixture = TestBed.createComponent(EditMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
