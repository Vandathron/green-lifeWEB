import { Component, Input, forwardRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { AppService } from '../../app.service';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

//
// Internal helpers

const now = new Date();

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

//
// Daterange component

@Component({
  selector: 'custom-daterange-picker', // tslint:disable-line
  template: `
 <form class="form-inline">
  <div class="form-group">
    <div class="input-group">
      <input class="form-control" placeholder="" name="dp"
        ngbDatepicker
        [value]="inputValue"
        readonly
        ngModel
        (ngModelChange)="onDateChange($event)"
        [displayMonths]="displayMonths"
        [dayTemplate]="t"
        [startDate]="_startDate"
        [navigation]="navigation"
        [disabled]="disabled"
        (keydown)="clear($event)"
        [placement]="isRTL ? 'bottom-right' : 'bottom-left'"
        #d="ngbDatepicker">
        <div class="input-group-append">
          <button class="input-group-text" [disabled]="disabled" (click)="d.toggle()" type="button">
            <span class="ion ion-md-calendar" style="cursor: pointer;"></span>
          </button>
        </div>
    </div>
  </div>
  </form>
<ng-template #t let-date="date" let-focused="focused">
        <div class="ngb-range-day"
          [ngClass]="{ 'bg-primary text-white': isFrom(date) || isTo(date), 'bg-light ngb-in-range': isHovered(date) || isInside(date) }"
          (mouseenter)="hoveredDate = date"
          (mouseleave)="hoveredDate = null">
          {{ date.day }}
        </div>
      </ng-template>
  

      
  `,

  styleUrls: ['./custom-daterange-picker.component.scss','../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomDaterangePickerComponent),
    multi: true,
  }]
})
export class CustomDaterangePickerComponent {
  isRTL: boolean;
 ngModel:NgModel;
 private onChange  = Function.prototype;
 private onTouched = Function.prototype;
  constructor(private appService: AppService, calendar: NgbCalendar) {
    this.isRTL = appService.isRTL;
    this._parseModel(this.ngModel);
    
    //
    // Ngb Datepicker
    //

   // this.fromDate = calendar.getToday();
   // this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);
  }

  //
  // Ngb Datepicker
  //

  // Single datepicker

 // model: NgbDateStruct = {
  //  year: now.getFullYear(),
  //  month: now.getMonth() + 1,
 //   day: now.getDate()
 // };

  displayMonths = 1;
  navigation = 'select';
  disabled = false;
  
  

  // Range datepicker

  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  inputValue="";
  _startDate: any;
  startDate=null;
  allowClear=true;
  dateFormat = 'MM/DD/YYYY';

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      //this.onChange([, null])
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      console.log("Second condition");
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this._updateModel();
  }
  writeValue(value: any) {
    this._parseModel(this.ngModel);
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }
  private _parseModel(period) {
    this.fromDate = this._fromFormatted(period && period.start);
    this.toDate = this._fromFormatted(period && period.end);
    this._updateValue();
  }
  private _fromFormatted(date) {
    const m = date ? moment(date, this.dateFormat) : null;
    return m && m.isValid() ? { year: m.year(), month: m.month() + 1, day: m.date() } : null;
  }

  registerOnTouched(fn: () => {}) {
    this.onTouched = fn;
  }
  clear($event, force = false) {
    // Clear model on backspace or delete key pressed
    if (this.allowClear && (force || $event.keyCode === 46 || $event.keyCode === 8)) {
      this.toDate = null;
      this.fromDate = null;
      this._updateModel();
    }
  }
  private _updateModel() {
    if (this.fromDate && this.toDate) {
      this.onChange([this._toFormatted(this.fromDate), this._toFormatted(this.toDate)]);
    }
    
    else if (!this.fromDate && !this.toDate) {
      this.onChange([null, null]);
    }
    this._updateValue();
  }
  private _toFormatted(date) {
    return moment({ year: date.year, month: date.month - 1, day: date.day }).format(this.dateFormat);
  }
  private _updateValue() {
    this._startDate = this.fromDate ? this.fromDate : this.startDate;

    // Display range only if both dates are defined(changed by tosin to ||)
    this.inputValue = this.fromDate || this.toDate ?
      this._toFormatted(this.fromDate) + ' - ' + this._toFormatted(this.toDate) :
      '';
  }
  
  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

}
