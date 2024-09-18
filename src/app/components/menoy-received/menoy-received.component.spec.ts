import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenoyReceivedComponent } from './menoy-received.component';

describe('MenoyReceivedComponent', () => {
  let component: MenoyReceivedComponent;
  let fixture: ComponentFixture<MenoyReceivedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenoyReceivedComponent]
    });
    fixture = TestBed.createComponent(MenoyReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
