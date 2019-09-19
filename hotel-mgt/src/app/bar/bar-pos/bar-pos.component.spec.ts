import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarPosComponent } from './bar-pos.component';

describe('BarPosComponent', () => {
  let component: BarPosComponent;
  let fixture: ComponentFixture<BarPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
