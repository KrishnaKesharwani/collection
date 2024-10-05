import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpdateStatusComponent } from './vpdate-status.component';

describe('VpdateStatusComponent', () => {
  let component: VpdateStatusComponent;
  let fixture: ComponentFixture<VpdateStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VpdateStatusComponent]
    });
    fixture = TestBed.createComponent(VpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
