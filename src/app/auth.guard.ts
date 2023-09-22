import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './modules/auth/services/auth.service';

export function authGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (oauthService.isLoggedIn()) {
      return true;
    }
    router.navigate(['/auth/login']);
    return false;
  };
}
