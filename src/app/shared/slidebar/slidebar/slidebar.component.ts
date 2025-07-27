import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RegisterService } from '../../../core/services/register/register.service';

@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [CommonModule, RouterLink , NgFor , NgIf],
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent {
  private registerService = inject(RegisterService);

  role = computed(() => this.registerService.getUserRole());
  isOpen = signal(false);

  toggleMenu() {
    this.isOpen.update((prev) => !prev);
  }
}
