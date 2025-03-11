import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-calendario-semana',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario-semana.component.html',
  styleUrls: ['./calendario-semana.component.scss']
})
export class CalendarioSemanaComponent implements OnInit {
  weekDays: Date[] = [];
  timeSlots: string[] = [];
  // Cada fila tendrá la hora y una lista de celdas para cada día
  schedule: { time: string, cells: { day: Date, available: boolean }[] }[] = [];
  availableHours: string[] = [];
  isLoading: boolean = true;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    // Se asume que el servicio devuelve un array de strings con fechas en formato ISO
    this.citaService.getHorasDisponibles('Certificados').subscribe({
      next: (data: string[]) => {
        this.availableHours = data;
        this.generateWeekSchedule();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar horas disponibles:', err);
        // Incluso si ocurre un error, se genera la estructura de la semana
        this.generateWeekSchedule();
        this.isLoading = false;
      }
    });
  }

  generateWeekSchedule(): void {
    this.weekDays = [];
    this.timeSlots = [];
    this.schedule = [];
    
    // Calcular el lunes de la semana actual.
    const currentDate = new Date();
    let dayOfWeek = currentDate.getDay();
    // En JavaScript, domingo = 0; para que el lunes sea el inicio, tratamos el domingo como 7.
    if (dayOfWeek === 0) { dayOfWeek = 7; }
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - (dayOfWeek - 1));

    // Generar los días de la semana: lunes a domingo.
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      this.weekDays.push(day);
    }

    // Generar las franjas horarias: de 08:00 a 14:00 en intervalos de 30 minutos.
    const startHour = 8;
    const endHour = 14;
    for (let hour = startHour; hour <= endHour; hour++) {
      if (hour < endHour) {
        this.timeSlots.push(this.formatTime(hour, 0));
        this.timeSlots.push(this.formatTime(hour, 30));
      } else {
        // Solo agregar la franja 14:00
        this.timeSlots.push(this.formatTime(hour, 0));
      }
    }

    // Construir la matriz del schedule
    for (let time of this.timeSlots) {
      const row = { time, cells: [] as { day: Date, available: boolean }[] };
      for (let day of this.weekDays) {
        // Se combina la fecha del día con la hora del turno
        const [hourStr, minuteStr] = time.split(':');
        const hour = Number(hourStr);
        const minute = Number(minuteStr);
        const slotDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute, 0);
        // Se obtiene el ISO string (se asume que el servicio entrega fechas en este mismo formato)
        const slotISO = slotDate.toISOString();
        const available = this.availableHours.includes(slotISO);
        row.cells.push({ day, available });
      }
      this.schedule.push(row);
    }
  }

  // Formatea una hora en "HH:mm"
  formatTime(hour: number, minute: number): string {
    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minute.toString().padStart(2, '0');
    return `${hourStr}:${minuteStr}`;
  }

  // Propiedad computada para mostrar el rango de la semana (por ejemplo, "Semana del 11/03/2025 al 17/03/2025")
  get weekRange(): string {
    if (this.weekDays.length > 0) {
      const start = this.weekDays[0];
      const end = this.weekDays[this.weekDays.length - 1];
      return `Semana del ${start.toLocaleDateString()} al ${end.toLocaleDateString()}`;
    }
    return '';
  }

  // Método para manejar la selección de un turno
  selectSlot(day: Date, time: string): void {
    const [hourStr, minuteStr] = time.split(':');
    const hour = Number(hourStr);
    const minute = Number(minuteStr);
    const slotDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute, 0);
    console.log("Turno seleccionado:", slotDate.toISOString());
    // Aquí puedes agregar la lógica para proceder con la reserva del turno.
  }
}
