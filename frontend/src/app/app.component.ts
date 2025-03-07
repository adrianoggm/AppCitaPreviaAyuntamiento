// src/app/app.component.ts
import { Component } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { CalendarioCompletoComponent } from './shared/components/calendario-completo/calendario-completo.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarioCompletoComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppAyuntamientoSedeElectrónica';

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
      items: []  // Puedes agregar items adicionales según lo necesites
    }
  };
}
