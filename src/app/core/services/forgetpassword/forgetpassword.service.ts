// forgetpassword.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {
  private forgetUrl = 'https://local-brand-store.onrender.com/api/auth/forgot-password';
  private resetUrl = 'https://local-brand-store.onrender.com/api/auth/reset-password';

  constructor(private http: HttpClient) {}

  sendResetCode(email: string): Observable<any> {
    return this.http.post(this.forgetUrl, { email });
  }

  resetPassword(code: string, newPassword: string): Observable<any> {
    return this.http.post(this.resetUrl, { code, newPassword });
  }
}
