import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { toAppGuardGuard } from './to-app.guard.guard';

describe('toAppGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => toAppGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
