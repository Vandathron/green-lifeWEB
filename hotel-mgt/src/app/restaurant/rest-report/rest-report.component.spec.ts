import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestReportComponent } from './rest-report.component';

describe('RestReportComponent', () => {
  let component: RestReportComponent;
  let fixture: ComponentFixture<RestReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
