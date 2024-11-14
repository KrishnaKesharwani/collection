import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcManagementComponent } from './vc-management.component';

describe('VcManagementComponent', () => {
  let component: VcManagementComponent;
  let fixture: ComponentFixture<VcManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VcManagementComponent]
    });
    fixture = TestBed.createComponent(VcManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
