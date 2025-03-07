import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiasDisponiblesComponent } from './shared/components/dias-disponibles/dias-disponibles.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DiasDisponiblesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
}
