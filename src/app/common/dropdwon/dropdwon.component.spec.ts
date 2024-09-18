import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdwonComponent } from './dropdwon.component';

describe('DropdwonComponent', () => {
  let component: DropdwonComponent;
  let fixture: ComponentFixture<DropdwonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdwonComponent]
    });
    fixture = TestBed.createComponent(DropdwonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
