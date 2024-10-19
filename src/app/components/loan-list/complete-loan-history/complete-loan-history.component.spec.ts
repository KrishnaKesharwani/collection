import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteLoanHistoryComponent } from './complete-loan-history.component';

describe('CompleteLoanHistoryComponent', () => {
  let component: CompleteLoanHistoryComponent;
  let fixture: ComponentFixture<CompleteLoanHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteLoanHistoryComponent]
    });
    fixture = TestBed.createComponent(CompleteLoanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
