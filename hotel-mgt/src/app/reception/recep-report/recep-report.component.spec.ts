import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepReportComponent } from './recep-report.component';

describe('RecepReportComponent', () => {
  let component: RecepReportComponent;
  let fixture: ComponentFixture<RecepReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
