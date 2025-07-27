


// import { Component, inject } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { RegisterService } from '../../core/services/register/register.service';
// import { Router, RouterLink } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule , RouterLink],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   private readonly registerService = inject(RegisterService);
//   private readonly router = inject(Router);

//   loginform: FormGroup = new FormGroup({
//     email: new FormControl(null, [Validators.required, Validators.email]),
//     password: new FormControl(null, Validators.required),
//   });

//   submitform(): void {
//     if (this.loginform.invalid) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill in all required fields.',
//       });
//       return;
//     }

//     this.registerService.sendLoginForm(this.loginform.value).subscribe({
//       next: (res) => {
//         console.log(res);

//         if (res.message === 'Already logged in' || res.message === 'Login successful') {
//           Swal.fire({
//             icon: 'success',
//             title: 'Login Successful',
//             showConfirmButton: false,
//             timer: 2000
//           });

//           setTimeout(() => {
//             localStorage.setItem("userToken", res.accessToken);
//                         localStorage.setItem("role", res.role); // ✅ حفظ الدور هنا

//             this.registerService.saveUserData();

//             const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/home';
//             this.router.navigateByUrl(redirectUrl);
//             localStorage.removeItem('redirectAfterLogin');
//           }, 2000);
//         } else {
//           Swal.fire({
//             icon: 'info',
//             title: 'Notice',
//             text: res.message || 'Unknown response.',
//           });
//         }
//       },
//       error: (err) => {
//         console.error(err);
//         const errorMessage = err?.error?.message || 'Something went wrong. Please try again.';
//         Swal.fire({
//           icon: 'error',
//           title: 'Login Failed',
//           text: errorMessage,
//         });
//       }
//     });
//   }
// }








import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../core/services/register/register.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);

  loginform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  submitform(): void {
    if (this.loginform.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    this.registerService.sendLoginForm(this.loginform.value).subscribe({
      next: (res) => {
        console.log(res);

        if (res.message === 'Already logged in' || res.message === 'Login successful') {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 2000
          });

          // ✅ خزّن التوكن والدور في السيرفيس
          this.registerService.saveLoginData(res.accessToken, res.Role);

          // ✅ استخرج بيانات المستخدم من التوكن
          this.registerService.saveUserData();

          // ✅ Redirect بعد ثانيتين
          setTimeout(() => {
            const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/home';
            this.router.navigateByUrl(redirectUrl);
            sessionStorage.removeItem('redirectAfterLogin');
          }, 2000);
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Notice',
            text: res.message || 'Unknown response.',
          });
        }
      },
      error: (err) => {
        console.error(err);
        const errorMessage = err?.error?.message || 'Something went wrong. Please try again.';
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
        });
      }
    });
  }
}



