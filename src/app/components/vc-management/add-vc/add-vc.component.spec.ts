import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVcComponent } from './add-vc.component';

describe('AddVcComponent', () => {
  let component: AddVcComponent;
  let fixture: ComponentFixture<AddVcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVcComponent]
    });
    fixture = TestBed.createComponent(AddVcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
