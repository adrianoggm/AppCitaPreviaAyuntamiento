import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Asegúrate de instalar Angular Material
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-calendario-completo',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './calendario-completo.component.html',
  styleUrls: ['./calendario-completo.component.scss'],
  encapsulation: ViewEncapsulation.Emulated 
})
export class CalendarioCompletoComponent implements OnInit {
  currentDate: Date = new Date(); // Mes que se muestra actualmente
  weeks: Array<Array<{ date: Date | null; isCurrentMonth: boolean }>> = [];
  availableDates: string[] = [];
  dayNames: string[] = [ 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom' ];
  isLoading: boolean = true; // Indicador de carga

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    // Llamada a la API para obtener los días disponibles (por ejemplo, para "Certificados")
    this.citaService.getDiasDisponibles('Certificados').subscribe({
      next: (data) => {
        this.availableDates = data;
        this.generateCalendar();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar días disponibles:', err);
        // Incluso en caso de error se genera el calendario
        this.generateCalendar();
        this.isLoading = false;
      }
    });
  }

  generateCalendar(): void {
    this.weeks = [];

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth(); // 0-indexado
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDays = lastDayOfMonth.getDate();
   
    // Ajuste para que el primer día (domingo) se alinee correctamente (dependiendo de la localización)
    const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
    let week: Array<{ date: Date | null; isCurrentMonth: boolean }> = [];

    // Relleno previo: celdas vacías para los días del mes anterior
    for (let i = 0; i < startDayIndex; i++) {
      week.push({ date: null, isCurrentMonth: false });
    }

    // Días del mes actual
    for (let day = 1; day <= numDays; day++) {
      const date = new Date(year, month, day);
      week.push({ date, isCurrentMonth: true });
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    // Relleno final: si la última semana tiene menos de 7 días
    if (week.length > 0) {
      while (week.length < 7) {
        week.push({ date: null, isCurrentMonth: false });
      }
      this.weeks.push(week);
    }
  }

  prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  // Formatea una fecha en "YYYY-MM-DD"
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const monthString = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayString = date.getDate().toString().padStart(2, '0');
    return `${year}-${monthString}-${dayString}`;
  }

  // Retorna true si la fecha está en availableDates (disponible para reserva)
  isAvailable(date: Date): boolean {
    return this.availableDates.includes(this.formatDate(date));
  }

  // Retorna true si la fecha es anterior a hoy (sin considerar la hora)
  isPast(date: Date): boolean {
    const today = new Date();
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return this.formatDate(date) < this.formatDate(todayMid);
  }

  // Retorna true si la fecha está dentro de la ventana de reserva (hoy hasta 30 días adelante)
  isWithinBookingWindow(date: Date): boolean {
    const today = new Date();
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const bookingWindowEnd = new Date(todayMid);
    bookingWindowEnd.setDate(todayMid.getDate() + 30);
    return date >= todayMid && date <= bookingWindowEnd;
  }

  // Acción al seleccionar un día: aquí podrías abrir un diálogo con el detalle del horario
  selectDay(date: Date): void {
    if (this.isWithinBookingWindow(date)) {
      if (this.isAvailable(date)) {
        console.log('Día seleccionado disponible:', this.formatDate(date));
        // Aquí abrirías el diálogo para mostrar horarios y permitir la reserva.
      } else {
        console.log('Día seleccionado dentro del booking window pero no disponible (lleno):', this.formatDate(date));
      }
    } else {
      console.log('Día seleccionado fuera de la ventana de reserva:', this.formatDate(date));
    }
  }
}
