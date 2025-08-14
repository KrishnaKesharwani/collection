import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstalmentComponent } from './add-instalment.component';

describe('AddInstalmentComponent', () => {
  let component: AddInstalmentComponent;
  let fixture: ComponentFixture<AddInstalmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInstalmentComponent]
    });
    fixture = TestBed.createComponent(AddInstalmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
