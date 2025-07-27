// src/app/components/register/register.component.ts

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../core/services/register/register.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterResponse } from '../../shared/interfaces/RegisterResponse/register-response';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);

  registerform: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  submitform(): void {
    this.registerService.sendRegisterForm(this.registerform.value).subscribe({
      next: (res: RegisterResponse) => {
        console.log(res);
        if (res.message === 'User registered successfully. Please verify your email.') {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Redirecting you to the login page...',
            showConfirmButton: false,
            timer: 2000,
          });

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      },
      error: (err) => {
        console.error(err);
        const errorMessage =
          err?.error?.message || 'Something went wrong. Please try again.';

        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage,
        });
      },
    });
  }
}
