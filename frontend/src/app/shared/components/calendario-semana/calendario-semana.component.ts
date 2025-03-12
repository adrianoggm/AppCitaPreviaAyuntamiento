import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CitaService } from '../../../core/services/cita.service';

interface ScheduleCell {
  day: Date;
  available: boolean;
  disabled: boolean;
}

interface ScheduleRow {
  time: string;
  cells: ScheduleCell[];
}

interface ScheduleBlock {
  hourLabel: string;
  slot1: ScheduleRow;
  slot2: ScheduleRow | null;
}

@Component({
  selector: 'app-calendario-semana',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './calendario-semana.component.html',
  styleUrls: ['./calendario-semana.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CalendarioSemanaComponent implements OnInit {
  // Para navegar entre semanas
  currentWeek: Date = new Date();
  // Para pruebas, puedes forzar la fecha de referencia (por ejemplo, en 2025)
  private referenceDate: Date = new Date(); // Por defecto es la fecha actual
  // Si pruebas con datos de 2025, descomenta la siguiente línea:
  // private referenceDate: Date = new Date("2025-03-26T00:00:00.000Z");

  weekDays: Date[] = [];
  timeSlots: string[] = [];
  schedule: ScheduleRow[] = [];
  scheduleGrouped: ScheduleBlock[] = []; // Propiedad para agrupar cada 2 franjas (1 hora)
  availableSlots: string[] = []; // Lista de turnos disponibles (ISO strings)
  isLoading: boolean = true;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.getHorasDisponibles('Certificados').subscribe({
      next: (data: string[]) => {
        this.availableSlots = data;
        this.generateWeekSchedule();
        this.groupSchedule();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar horas disponibles:', err);
        this.generateWeekSchedule();
        this.groupSchedule();
        this.isLoading = false;
      }
    });
  }

  generateWeekSchedule(): void {
    this.weekDays = [];
    this.timeSlots = [];
    this.schedule = [];
    
    // Calcular el lunes de la semana actual usando currentWeek
    const currentDate = new Date(this.currentWeek);
    let dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0) { dayOfWeek = 7; }
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - (dayOfWeek - 1));

    // Generar los 7 días (lunes a domingo)
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      this.weekDays.push(day);
    }

    // Generar franjas horarias: de 08:00 a 14:00 (último turno a las 13:30)
    const startHour = 8;
    const endHour = 14;
    for (let hour = startHour; hour < endHour; hour++) {
      this.timeSlots.push(this.formatTime(hour, 0));
      this.timeSlots.push(this.formatTime(hour, 30));
    }
    // Si deseas incluir la franja de 14:00, descomenta la siguiente línea:
    // this.timeSlots.push(this.formatTime(endHour, 0));

    // Construir la matriz de horarios (cada fila corresponde a una franja de 30 minutos)
    for (let time of this.timeSlots) {
      const row: ScheduleRow = { time, cells: [] };
      for (let day of this.weekDays) {
        const [hourStr, minuteStr] = time.split(':');
        const hour = Number(hourStr);
        const minute = Number(minuteStr);
        const slotDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute, 0);
        const slotISO = slotDate.toISOString();
        
        let available = false;
        let disabled = false;
        // Si el turno es anterior a la referenceDate, se deshabilita (gris)
        if (this.isPast(slotDate)) {
          disabled = true;
        } else if (!this.isWithinBookingWindow(slotDate)) {
          // Si está fuera de la ventana de reserva, se deshabilita (gris)
          disabled = true;
        } else {
          // Dentro de la ventana: si aparece en availableSlots, está disponible (verde);
          // de lo contrario, se considera no disponible (rojo)
          available = this.availableSlots.includes(slotISO);
        }
        row.cells.push({ day, available, disabled });
      }
      this.schedule.push(row);
    }
  }

  private groupSchedule(): void {
    this.scheduleGrouped = [];
    // Agrupamos de dos en dos (cada bloque de 1 hora tiene 2 franjas de 30 minutos)
    for (let i = 0; i < this.schedule.length; i += 2) {
      const slot1 = this.schedule[i];
      const slot2 = this.schedule[i + 1] || null;
      // Usamos el label de la franja :30 para representar la hora (si existe slot2)
      const hourLabel = slot2 ? slot2.time : slot1.time;
      this.scheduleGrouped.push({ hourLabel, slot1, slot2 });
    }
  }

  // Formatea la hora en "HH:mm"
  formatTime(hour: number, minute: number): string {
    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minute.toString().padStart(2, '0');
    return `${hourStr}:${minuteStr}`;
  }

  // Rango de la semana para el header
  get weekRange(): string {
    if (this.weekDays.length > 0) {
      const start = this.weekDays[0];
      const end = this.weekDays[this.weekDays.length - 1];
      return `Semana del ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()} al ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`;
    }
    return '';
  }

  // Navegar a la semana anterior
  prevWeek(): void {
    this.currentWeek.setDate(this.currentWeek.getDate() - 7);
    this.generateWeekSchedule();
    this.groupSchedule();
  }

  // Navegar a la semana siguiente
  nextWeek(): void {
    this.currentWeek.setDate(this.currentWeek.getDate() + 7);
    this.generateWeekSchedule();
    this.groupSchedule();
  }

  // Manejo de la selección de un turno
  selectSlot(day: Date, time: string): void {
    const [hourStr, minuteStr] = time.split(':');
    const slotDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), Number(hourStr), Number(minuteStr), 0);
    console.log("Turno seleccionado:", slotDate.toISOString());
    // Aquí implementar la lógica para reservar el turno
  }

  // Retorna true si el turno es anterior a la referenceDate
  isPast(slot: Date): boolean {
    return slot < this.referenceDate;
  }

  // Retorna true si el turno está dentro de la ventana de reserva (desde referenceDate hasta +30 días)
  isWithinBookingWindow(slot: Date): boolean {
    const todayMid = new Date(this.referenceDate.getFullYear(), this.referenceDate.getMonth(), this.referenceDate.getDate());
    const bookingWindowEnd = new Date(todayMid);
    bookingWindowEnd.setDate(todayMid.getDate() + 30);
    return slot >= todayMid && slot <= bookingWindowEnd;
  }
}
