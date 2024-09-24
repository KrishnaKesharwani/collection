import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldValidationComponent } from './input-field-validation.component';

describe('InputFieldValidationComponent', () => {
  let component: InputFieldValidationComponent;
  let fixture: ComponentFixture<InputFieldValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputFieldValidationComponent]
    });
    fixture = TestBed.createComponent(InputFieldValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
