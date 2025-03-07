import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-dias-disponibles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dias-disponibles.component.html',
  styleUrls: ['./dias-disponibles.component.scss']
})
export class DiasDisponiblesComponent implements OnInit {
  diasDisponibles: string[] = [];
  errorMessage: string = '';

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    // Por ejemplo, consumimos el servicio con el parámetro "Certificados"
    this.citaService.getDiasDisponibles('Certificados').subscribe({
      next: (data) => this.diasDisponibles = data,
      error: (err) => {
        console.error('Error al cargar días disponibles:', err);
        this.errorMessage = 'No se pudieron cargar los días disponibles.';
      }
    });
  }
}
