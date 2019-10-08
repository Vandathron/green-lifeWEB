import { TestBed, async, inject } from '@angular/core/testing';

import { ReceptionGuard } from './reception.guard';

describe('ReceptionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceptionGuard]
    });
  });

  it('should ...', inject([ReceptionGuard], (guard: ReceptionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
