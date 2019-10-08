import { TestBed, async, inject } from '@angular/core/testing';

import { PosGuard } from './pos.guard';

describe('PosGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PosGuard]
    });
  });

  it('should ...', inject([PosGuard], (guard: PosGuard) => {
    expect(guard).toBeTruthy();
  }));
});
