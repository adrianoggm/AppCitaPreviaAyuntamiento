
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarConfig } from './sidebar.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() config!: SidebarConfig;
  showDropdown = false;

  onMouseEnter(): void {
    this.showDropdown = true;
  }

  onMouseLeave(): void {
    this.showDropdown = false;
  }
}
