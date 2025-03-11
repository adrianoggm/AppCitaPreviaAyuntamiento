import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-calendario-semana',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './calendario-semana.component.html',
  styleUrls: ['./calendario-semana.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CalendarioSemanaComponent implements OnInit {
  weekDays: Date[] = [];
  timeSlots: string[] = [];
  // La matriz schedule: cada fila tiene la hora y para cada día una celda con disponibilidad
  schedule: { time: string, cells: { day: Date, available: boolean, disabled: boolean }[] }[] = [];
  availableSlots: string[] = []; // Valores ISO de los turnos disponibles
  isLoading: boolean = true;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    // Se espera que el servicio devuelva un array de strings en formato ISO (por ejemplo, "2025-03-11T08:00:00.000Z")
    this.citaService.getHorasDisponibles('Certificados').subscribe({
      next: (data: string[]) => {
        this.availableSlots = data;
        this.generateWeekSchedule();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar horas disponibles:', err);
        // Si ocurre error, igualmente generamos la estructura de la semana
        this.generateWeekSchedule();
        this.isLoading = false;
      }
    });
  }

  generateWeekSchedule(): void {
    this.weekDays = [];
    this.timeSlots = [];
    this.schedule = [];
    
    // Calcular el lunes de la semana actual
    const currentDate = new Date();
    let dayOfWeek = currentDate.getDay();
    // En JavaScript, domingo = 0; si es 0, lo tratamos como 7 para que el lunes sea el inicio
    if (dayOfWeek === 0) { dayOfWeek = 7; }
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - (dayOfWeek - 1));

    // Generar los 7 días de la semana (lunes a domingo)
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      this.weekDays.push(day);
    }

    // Generar las franjas horarias: de 08:00 a 14:00 (último turno a las 13:30)
    const startHour = 8;
    const endHour = 14;
    for (let hour = startHour; hour < endHour; hour++) {
      this.timeSlots.push(this.formatTime(hour, 0));
      this.timeSlots.push(this.formatTime(hour, 30));
    }
    // Si deseas incluir la franja de 14:00, descomenta la siguiente línea:
    // this.timeSlots.push(this.formatTime(endHour, 0));

    // Construir la matriz de horarios
    for (let time of this.timeSlots) {
      const row = { time, cells: [] as { day: Date, available: boolean, disabled: boolean }[] };
      for (let day of this.weekDays) {
        // Combinar la fecha del día con la hora del turno
        const [hourStr, minuteStr] = time.split(':');
        const hour = Number(hourStr);
        const minute = Number(minuteStr);
        const slotDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute, 0);
        const slotISO = slotDate.toISOString();
        // Si el slot existe en availableSlots, se considera disponible
        const available = this.availableSlots.includes(slotISO);
        // Aquí puedes agregar lógica para deshabilitar el turno (por ejemplo, fuera de ventana)
        const disabled = false;
        row.cells.push({ day, available, disabled });
      }
      this.schedule.push(row);
    }
  }

  // Formatea la hora en "HH:mm"
  formatTime(hour: number, minute: number): string {
    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minute.toString().padStart(2, '0');
    return `${hourStr}:${minuteStr}`;
  }

  // Propiedad computada para mostrar el rango de la semana en el header
  get weekRange(): string {
    if (this.weekDays.length > 0) {
      const start = this.weekDays[0];
      const end = this.weekDays[this.weekDays.length - 1];
      return `Semana del ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()} al ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`;
    }
    return '';
  }

  // Manejo de la selección de un turno
  selectSlot(day: Date, time: string): void {
    const [hourStr, minuteStr] = time.split(':');
    const slotDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), Number(hourStr), Number(minuteStr), 0);
    console.log("Turno seleccionado:", slotDate.toISOString());
    // Aquí implementar la lógica para reservar el turno
  }
}