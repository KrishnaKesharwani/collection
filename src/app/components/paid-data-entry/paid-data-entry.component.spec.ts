import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidDataEntryComponent } from './paid-data-entry.component';

describe('PaidDataEntryComponent', () => {
  let component: PaidDataEntryComponent;
  let fixture: ComponentFixture<PaidDataEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaidDataEntryComponent]
    });
    fixture = TestBed.createComponent(PaidDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
