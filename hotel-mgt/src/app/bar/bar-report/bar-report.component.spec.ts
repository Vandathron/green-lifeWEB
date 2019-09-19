import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarReportComponent } from './bar-report.component';

describe('BarReportComponent', () => {
  let component: BarReportComponent;
  let fixture: ComponentFixture<BarReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
