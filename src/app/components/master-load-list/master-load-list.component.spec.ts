import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLoadListComponent } from './master-load-list.component';

describe('MasterLoadListComponent', () => {
  let component: MasterLoadListComponent;
  let fixture: ComponentFixture<MasterLoadListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterLoadListComponent]
    });
    fixture = TestBed.createComponent(MasterLoadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
