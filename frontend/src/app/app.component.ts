// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Importa CommonModule para las directivas estructurales
import { CalendarioCompletoComponent } from './shared/components/calendario-completo/calendario-completo.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { CalendarioSemanaComponent } from './shared/components/calendario-semana/calendario-semana.component';
import { CrearTramiteComponent } from './shared/components/crear-tramite/crear-tramite.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CalendarioCompletoComponent,
    SidebarComponent,
    TopBarComponent,
    CalendarioSemanaComponent,
    CrearTramiteComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AppAyuntamientoSedeElectrónica';
  isLoginRoute = false;

  sidebarConfig = {
    tramites: {
      title: 'TRÁMITES',
      items: [
        { id: 'misTramites', label: 'Mis Trámites' },
        { id: 'reservarTramite', label: 'Reservar Trámite' }
      ]
    },
    datos: {
      title: 'DATOS',
      items: [] // Puedes agregar items adicionales según lo necesites
    }
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Ajusta la condición según tus rutas de autenticación
      this.isLoginRoute = event.urlAfterRedirects === '/login';
    });
  }
}
