



// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';

// @Injectable({
//   providedIn: 'root'
// })
// export class RegisterService {

//   userData: any = null;

//   constructor(private httpClient: HttpClient) {}

//   // Register API
//   sendRegisterForm(data: object): Observable<any> {
//     return this.httpClient.post(
//       'https://local-brand-store.onrender.com/api/auth/register',
//       data
//     );
//   }

//   // Login API
//   sendLoginForm(data: object): Observable<any> {
//     return this.httpClient.post(
//       'https://local-brand-store.onrender.com/api/auth/login',
//       data
//     );
//   }

//   // Save user data from token (if needed)
//   saveUserData(): void {
//     const token = localStorage.getItem('userToken');
//     if (token) {
//       try {
//         this.userData = jwtDecode(token);
//         console.log('UserData:', this.userData);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         this.userData = null;
//       }
//     }
//   }

//   // Check if user is logged in and token is valid
//   isUserLoggedIn(): boolean {
//     const token = localStorage.getItem('userToken');
//     if (!token) return false;

//     try {
//       const decoded: any = jwtDecode(token);
//       const exp = decoded.exp;
//       const now = Math.floor(Date.now() / 1000);
//       return exp > now;
//     } catch (error) {
//       return false;
//     }
//   }

//   // Get token from localStorage
//   getToken(): string | null {
//     return localStorage.getItem('userToken');
//   }

//   // Get user role from localStorage
//   getUserRole(): string | null {
//     return localStorage.getItem('role');
//   }

//   // Save token and role (call this after login)
//   saveLoginData(token: string, role: string): void {
//     localStorage.setItem('userToken', token);
//     localStorage.setItem('role', role);
//   }

//   // Clear token, role, and user data
//   logout(): void {
//     localStorage.removeItem('userToken');
//     localStorage.removeItem('role');
//     this.userData = null;
//   }
// }





import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  userData: any = null;

  constructor(private httpClient: HttpClient) {}

  // Register API
  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(
      'https://local-brand-store.onrender.com/api/auth/register',
      data
    );
  }

  // Login API
  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(
      'https://local-brand-store.onrender.com/api/auth/login',
      data
    );
  }

  // Save token and role in sessionStorage
  saveLoginData(token: string, role: string): void {
    sessionStorage.setItem('userToken', token);
    sessionStorage.setItem('role', role);
    console.log('Token & Role saved in sessionStorage:', token, role);
  }

  // Save user data from token (if needed)
  saveUserData(): void {
    const token = sessionStorage.getItem('userToken');
    console.log('Token inside saveUserData():', token);
    if (token) {
      try {
        this.userData = jwtDecode(token);
        console.log('UserData:', this.userData);
      } catch (error) {
        console.error('Error decoding token:', error);
        this.userData = null;
      }
    } else {
      console.warn('No token found in sessionStorage.');
    }
  }

  // Check if user is logged in and token is valid
  isUserLoggedIn(): boolean {
    const token = sessionStorage.getItem('userToken');
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp > now;
    } catch (error) {
      return false;
    }
  }

  // Get token from sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('userToken');
  }

  // Get user role from sessionStorage
  getUserRole(): string | null {
    return sessionStorage.getItem('role');
  }

  // Clear token, role, and user data from sessionStorage
  logout(): void {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('role');
    this.userData = null;
    console.log('User logged out.');
  }
}
