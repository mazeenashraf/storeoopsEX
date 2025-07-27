// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from "../../navbar/navbar/navbar.component";
// import { FooterComponent } from "../../footer/footer/footer.component";
// import { SlidebarComponent } from "../../../shared/slidebar/slidebar/slidebar.component";

// @Component({
//   selector: 'app-blank-layout',
//   imports: [RouterOutlet, NavbarComponent, FooterComponent, SlidebarComponent],
//   templateUrl: './blank-layout.component.html',
//   styleUrl: './blank-layout.component.css'
// })
// export class BlankLayoutComponent {

// }


import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SlidebarComponent } from '../../../shared/slidebar/slidebar/slidebar.component';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { FooterComponent } from '../../footer/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SlidebarComponent, NavbarComponent , NgIf , NgFor , FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent {}
