import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageForApplierComponent } from './massage-for-applier.component';

describe('MassageForApplierComponent', () => {
  let component: MassageForApplierComponent;
  let fixture: ComponentFixture<MassageForApplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MassageForApplierComponent]
    });
    fixture = TestBed.createComponent(MassageForApplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
