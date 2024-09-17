import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeComponent } from './custome.component';

describe('CustomeComponent', () => {
  let component: CustomeComponent;
  let fixture: ComponentFixture<CustomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomeComponent]
    });
    fixture = TestBed.createComponent(CustomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
