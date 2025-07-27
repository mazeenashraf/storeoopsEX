import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('userToken');

  if (token) {
    return true; // ✅ معاه توكن، يدخل عادي
  } else {
    sessionStorage.setItem('redirectAfterLogin', state.url); // 🧠 خزّن الصفحة اللي كان رايحها
    return router.createUrlTree(['/login']); // 🚫 مفيش توكن، وديه يسجل
  }
};
