// forgetpassword.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ForgetpasswordService } from '../../core/services/forgetpassword/forgetpassword.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  forgetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forgetService: ForgetpasswordService,
    private router: Router
  ) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgetForm.invalid) return;

    const email = this.forgetForm.value.email;

    this.forgetService.sendResetCode(email).subscribe({
      next: () => {
        Swal.fire('Success', 'Reset code sent to your email.', 'success').then(() => {
          this.router.navigate(['/resetpassword']);
        });
      },
      error: (err) => {
        Swal.fire('Error', err.error?.message || 'Something went wrong!', 'error');
      }
    });
  }
}
