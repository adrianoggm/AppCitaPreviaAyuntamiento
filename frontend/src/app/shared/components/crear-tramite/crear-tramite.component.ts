import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TramiteService } from '../../../core/services/tramite.service';
import { TipotramiteMetadatoService } from '../../../core/services/tipotramitemetadato.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-crear-tramite',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './crear-tramite.component.html',
  styleUrls: ['./crear-tramite.component.scss']
})
export class CrearTramiteComponent implements OnInit {
  createTramiteForm!: FormGroup;
  errorMessage: string = '';
  // Mapa obtenido desde el backend: { nombreTramite: nombretipotramite }
  tramitesMap: { [key: string]: string } = {};
  // Lista de sugerencias filtradas (keys del mapa)
  filteredTramites: string[] = [];
  // Observable para la búsqueda (se asigna en ngOnInit)
  filteredTramites$!: Observable<string[]>;
  // Bandera para controlar si el input está enfocado
  isInputFocused: boolean = false;
  // Plantilla obtenida al consultar el trámite seleccionado
  selectedTemplate: any = null;

  constructor(
    private fb: FormBuilder,
    private tramiteService: TramiteService,
    private tipotramiteMetadatoService: TipotramiteMetadatoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario con el campo tipoTramite para la búsqueda
    this.createTramiteForm = this.fb.group({
      tipoTramite: ['', Validators.required]
    });

    // Se obtiene el mapa de nombretramites a través del servicio
    this.tramiteService.getNombreTramitesMap().subscribe({
      next: (mapData) => {
        this.tramitesMap = mapData;
        const keys = Object.keys(mapData);

        // Configura el observable para filtrar sugerencias conforme se escribe
        this.filteredTramites$ = this.createTramiteForm.get('tipoTramite')!.valueChanges.pipe(
          startWith(''),
          map((value: string) => this.filterTramites(value, keys))
        );

        // Actualiza la lista filtrada para usarla directamente en el template
        this.createTramiteForm.get('tipoTramite')!.valueChanges.pipe(
          startWith(''),
          map((value: string) => this.filterTramites(value, keys))
        ).subscribe(filtered => {
          this.filteredTramites = filtered;
        });
      },
      error: (err) => {
        console.error('Error al obtener el mapa de trámites:', err);
      }
    });
  }

  /**
   * Controla el evento de focus del input.
   */
  onFocus(): void {
    this.isInputFocused = true;
  }

  /**
   * Controla el evento de blur del input.
   * Se usa un setTimeout para permitir el click en las sugerencias.
   */
  onBlur(): void {
    setTimeout(() => {
      this.isInputFocused = false;
    }, 200);
  }

  /**
   * Filtra los nombres de trámite (keys del mapa) en función del valor ingresado.
   * Si el input está vacío, retorna un array vacío.
   */
  private filterTramites(value: string, keys: string[]): string[] {
    if (!value.trim()) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return keys.filter(tramite => tramite.toLowerCase().includes(filterValue));
  }

  /**
   * Se dispara al seleccionar un trámite de la lista de sugerencias.
   * Actualiza el formulario y consulta la plantilla asociada.
   */
  onSelectTramite(tramite: string): void {
    // Actualiza el valor del formulario
    this.createTramiteForm.get('tipoTramite')!.setValue(tramite);
    // Llama al servicio para obtener la plantilla del trámite seleccionado.
    this.tipotramiteMetadatoService.getTemplateByNombre(tramite).subscribe({
      next: (template) => {
        this.selectedTemplate = template;
        console.log('Plantilla obtenida:', template);
      },
      error: (err) => {
        console.error('Error al obtener la plantilla del trámite:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.createTramiteForm.valid) {
      // El servicio completará los demás campos (idusuario, estado, código, observaciones, documentos, etc.)
      this.tramiteService.createTramite(this.createTramiteForm.value).subscribe({
        next: (res) => {
          console.log('Trámite creado:', res);
          this.router.navigate(['/']); // Redirige tras la creación exitosa
        },
        error: (err) => {
          this.errorMessage = 'Error al crear el trámite: ' + err.message;
        }
      });
    }
  }
}
