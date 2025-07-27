import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { UsersService } from '../../../core/services/allusers/allusers.service';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class UsersAdminComponent implements OnInit {
  users: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.users;
      },
      error: (err) => {
        Swal.fire('Error', 'Failed to load users', 'error');
        console.error(err);
      }
    });
  }

 promoteUser(id: string): void {
  this.usersService.promoteUser(id).subscribe({
    next: () => {
      Swal.fire('Success', 'User has been promoted to admin.', 'success');
      this.loadUsers();
    },
    error: (err) => {
      console.error('Full error:', err);
      console.log('Error content:', err.error);

      Swal.fire(
        'Error',
        err.error?.message || err.error?.msg || err.message || 'Failed to promote user',
        'error'
      );
    }
  });
}

  deleteUser(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.loadUsers();
          },
          error: (err) => {
            Swal.fire('Error', 'Failed to delete user', 'error');
            console.error(err);
          }
        });
      }
    });
  }
}