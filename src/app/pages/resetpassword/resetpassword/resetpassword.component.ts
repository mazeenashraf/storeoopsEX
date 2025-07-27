// resetpassword.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ForgetpasswordService } from '../../../core/services/forgetpassword/forgetpassword.service';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forgetService: ForgetpasswordService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      code: ['', Validators.required],
      newPassword: ['', [Validators.required, ]]
    });
  }

  onSubmit() {
    if (this.resetForm.invalid) return;

    const { code, newPassword } = this.resetForm.value;

    this.forgetService.resetPassword(code, newPassword).subscribe({
      next: () => {
        Swal.fire('Success', 'Password has been reset.', 'success').then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        Swal.fire('Error', err.error?.message || 'Invalid code or password.', 'error');
      }
    });
  }
}
