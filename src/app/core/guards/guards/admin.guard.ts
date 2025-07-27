import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private registerService: RegisterService, private router: Router) {}

  canActivate(): boolean {
    const role = this.registerService.getUserRole();
    if (role === 'admin') return true;

    this.router.navigate(['/home']); // أو أي صفحة تانية تحبها
    return false;
  }
}