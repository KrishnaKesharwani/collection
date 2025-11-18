import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcReceivedMembersComponent } from './vc-received-members.component';

describe('VcReceivedMembersComponent', () => {
  let component: VcReceivedMembersComponent;
  let fixture: ComponentFixture<VcReceivedMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VcReceivedMembersComponent]
    });
    fixture = TestBed.createComponent(VcReceivedMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
