import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarioCompletoComponent } from './shared/components/calendario-completo/calendario-completo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarioCompletoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
}
