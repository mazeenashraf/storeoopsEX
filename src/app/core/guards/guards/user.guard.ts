import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private registerService: RegisterService, private router: Router) {}

  canActivate(): boolean {
    const role = this.registerService.getUserRole();
    if (role === 'user') return true;

    this.router.navigate(['/home']);
    return false;
  }
}