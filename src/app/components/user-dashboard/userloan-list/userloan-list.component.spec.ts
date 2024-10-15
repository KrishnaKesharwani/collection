import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloanListComponent } from './userloan-list.component';

describe('UserloanListComponent', () => {
  let component: UserloanListComponent;
  let fixture: ComponentFixture<UserloanListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserloanListComponent]
    });
    fixture = TestBed.createComponent(UserloanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
