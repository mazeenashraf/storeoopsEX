import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../core/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private profileService = inject(ProfileService);

  profileform: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    oldPassword: new FormControl(null),
    newPassword: new FormControl(null)
  });

  submitform(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save the changes to your profile?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.updateProfile(this.profileform.value).subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Profile Updated',
              text: 'Your profile has been successfully updated.',
              confirmButtonText: 'OK'
            });
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Update Failed',
              text: 'An error occurred while updating your profile. Please try again.',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }
}
