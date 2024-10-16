import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalGoogleChartsComponent } from './global-google-charts.component';

describe('GlobalGoogleChartsComponent', () => {
  let component: GlobalGoogleChartsComponent;
  let fixture: ComponentFixture<GlobalGoogleChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalGoogleChartsComponent]
    });
    fixture = TestBed.createComponent(GlobalGoogleChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
