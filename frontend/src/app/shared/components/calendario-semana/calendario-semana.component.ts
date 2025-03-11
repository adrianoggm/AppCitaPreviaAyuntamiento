import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-calendario-semana',
  standalone: true,
  templateUrl: './calendario-semana.component.html',
  styleUrls: ['./calendario-semana.component.scss']
})
export class CalendarioSemanaComponent implements OnInit {
  currentDate: Date = new Date(); // Fecha de referencia para la semana actual
  week: Array<{ date: Date; isCurrentWeek: boolean; available: boolean }> = [];
  availableHours: string[] = [];
  dayNames: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  isLoading: boolean = true; // Indicador de carga

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    // Llamada a la API para obtener las horas disponibles (por ejemplo, para "Certificados")
    this.citaService.getHorasDisponibles('Certificados').subscribe({
      next: (data) => {
        this.availableHours = data;
        this.generateWeek();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar horas disponibles:', err);
        // Incluso en caso de error se genera la semana
        this.generateWeek();
        this.isLoading = false;
      }
    });
  }

  generateWeek(): void {
    this.week = [];
    // Calculamos el lunes de la semana actual.
    // getDay() devuelve 0 para domingo, 1 para lunes, etc.
    // Convertimos el domingo a 7 para que la lógica funcione correctamente.
    const currentDay = this.currentDate.getDay() === 0 ? 7 : this.currentDate.getDay();
    const monday = new Date(this.currentDate);
    monday.setDate(this.currentDate.getDate() - (currentDay - 1));

    // Generamos los 7 días (de lunes a domingo)
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      const formattedDate = this.formatDate(day);
      // Se marca el día como "disponible" si la fecha se encuentra en availableHours.
      const available = this.availableHours.includes(formattedDate);
      this.week.push({ date: day, isCurrentWeek: true, available });
    }
  }

  prevWeek(): void {
    // Retrocede 7 días y regenera la semana.
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.generateWeek();
  }

  nextWeek(): void {
    // Avanza 7 días y regenera la semana.
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.generateWeek();
  }

  // Formatea una fecha en "YYYY-MM-DD" para comparar con availableHours.
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const monthString = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayString = date.getDate().toString().padStart(2, '0');
    return `${year}-${monthString}-${dayString}`;
  }

  // Formatea una fecha en "DD/MM/YYYY" para mostrar en la cabecera.
  formatDateDisplay(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Propiedad computada que retorna el rango de fechas de la semana actual.
  get weekRange(): string {
    if (this.week.length > 0) {
      const start = this.week[0].date;
      const end = this.week[6].date;
      return `Semana del ${this.formatDateDisplay(start)} al ${this.formatDateDisplay(end)}`;
    }
    return '';
  }

  // Acción al seleccionar un día: aquí podrías abrir un diálogo o mostrar más detalles.
  selectDay(date: Date): void {
    const formattedDate = this.formatDate(date);
    if (this.availableHours.includes(formattedDate)) {
      console.log('Día seleccionado con horas disponibles:', formattedDate);
      // Aquí se podría abrir un diálogo con el detalle de las horas disponibles.
    } else {
      console.log('Día seleccionado sin horas disponibles:', formattedDate);
    }
  }
}
