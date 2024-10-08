import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionHistoryComponent } from './collection-history.component';

describe('CollectionHistoryComponent', () => {
  let component: CollectionHistoryComponent;
  let fixture: ComponentFixture<CollectionHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionHistoryComponent]
    });
    fixture = TestBed.createComponent(CollectionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
