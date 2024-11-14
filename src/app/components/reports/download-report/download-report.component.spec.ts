import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadReportComponent } from './download-report.component';

describe('DownloadReportComponent', () => {
  let component: DownloadReportComponent;
  let fixture: ComponentFixture<DownloadReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadReportComponent]
    });
    fixture = TestBed.createComponent(DownloadReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
