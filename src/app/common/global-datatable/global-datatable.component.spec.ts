import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDatatableComponent } from './global-datatable.component';

describe('GlobalDatatableComponent', () => {
  let component: GlobalDatatableComponent;
  let fixture: ComponentFixture<GlobalDatatableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalDatatableComponent]
    });
    fixture = TestBed.createComponent(GlobalDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
