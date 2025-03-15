import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { toLoginGuardGuard } from './to-login.guard.guard';

describe('toLoginGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => toLoginGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
