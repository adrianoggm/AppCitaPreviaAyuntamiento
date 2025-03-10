import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatToolbarModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  // Puedes pasar estos valores desde el componente padre
  @Input() appTitle: string = 'Mi Aplicación';
  @Input() sectionTitle: string = 'Sección Actual';
  logoUrl: string = '../../../assets/images/logo.jpg';

}
