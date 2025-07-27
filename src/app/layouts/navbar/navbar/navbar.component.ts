// import { Component, inject, Input } from '@angular/core';
// import { Router, RouterLink, RouterLinkActive } from '@angular/router';
// import { NotificationDropdownComponent } from "../../../pages/notification/notification/notification.component";
// import { CommonModule } from '@angular/common';
// import { RegisterService } from '../../../core/services/register/register.service';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterLink,
//     RouterLinkActive,
//     NotificationDropdownComponent
//   ],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.css'
// })
// export class NavbarComponent {
//   private registerService = inject(RegisterService);
//   private router = inject(Router); // ✅ Inject Router

//   @Input() islogin: boolean = true;


// }



import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationDropdownComponent } from "../../../pages/notification/notification/notification.component";
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../../core/services/register/register.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NotificationDropdownComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private registerService = inject(RegisterService);
  private router = inject(Router);

  islogin: boolean = false;

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = sessionStorage.getItem('userToken');
    this.islogin = !!token; // true لو فيه توكن
  }
}
