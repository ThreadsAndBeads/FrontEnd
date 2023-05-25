import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TokenStorageService } from '../services/token/token-storage.service';

export const SellerGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router: Router = inject(Router);
  const tokenStorage: TokenStorageService = inject(TokenStorageService);

  if (tokenStorage.isSeller()) return true;
  return false;
};