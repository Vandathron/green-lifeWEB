import { TestBed, async, inject } from '@angular/core/testing';

import { RoutesGuard } from './routes.guard';

describe('RoutesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutesGuard]
    });
  });

  it('should ...', inject([RoutesGuard], (guard: RoutesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
