import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TramiteService } from '../../../core/services/tramite.service';
import { TipotramiteMetadatoService } from '../../../core/services/tipotramitemetadato.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { startWith, map,catchError } from 'rxjs/operators';
import { UsuarioService } from '../../../core/services/usuario.service';



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
    private usuarioService: UsuarioService,
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
    console.log('Formulario: Se manda correctamente');
    if (this.createTramiteForm.valid) {
      // Obtén la key seleccionada y el tipo trámite mapeado
      const selectedKey = this.createTramiteForm.value.tipoTramite;
      const tipoTramite = this.tramitesMap[selectedKey]; // Ej.: "Certificados"
      console.log('Formulario: Procesando trámite...');
  
      // Construye los demás campos
      const nombre = `Trámite de ${tipoTramite}`;
      const estado = 'pendiente';
      const fechaInicio = new Date().toISOString();
      // Inicializamos fechaFin con un valor por defecto
      const fechaFin = '0001-01-01T00:00:01.000Z';
      
      // Primero obtén el idusuario de forma asíncrona
      this.obtenerIdUsuario().subscribe((idusuario) => {
        console.log('Id del usuario:', idusuario);
  
        // Formateamos la fecha actual en formato YYYYMMDD
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().substring(0, 10).replace(/-/g, '');
        // Genera un número aleatorio de 4 dígitos
        const randomNumber = Math.floor(Math.random() * 9000 + 1000);
        // Genera el código siguiendo el formato:
        // TRAM + primeras 3 letras del tipo trámite (mayúsculas) + '-' + fecha formateada + '-' + '001' + random de 4 dígitos
        const codigo = `TRAM${tipoTramite.substr(0, 3).toUpperCase()}-${formattedDate}-001${randomNumber}`;
  
        const observaciones = "";
        const documentos: string[] = [];
  
        // Arma el objeto trámite
        const tramite = {
          nombre,
          estado,
          fechaInicio,
          fechaFin,
          idusuario,
          codigo,
          tipoTramite,
          observaciones,
          documentos
        };
        console.log("tramite", tramite);
  
        // Envía el trámite al backend a través del servicio
        this.tramiteService.createTramite(tramite).subscribe({
          next: (res) => {
            console.log('Trámite creado:', res);
            this.router.navigate(['/']); // Redirige tras la creación exitosa
          },
          error: (err) => {
            this.errorMessage = 'Error al crear el trámite: ' + err.message;
          }
        });
      });
    }
  }
  

  obtenerIdUsuario(): Observable<string> {
    // Recupera el nombre del usuario, si no existe se asigna una cadena vacía
    const nombreusuario: string = localStorage.getItem('nombreusuario') || '';
    console.log('Nombre usuario:', nombreusuario);
    
    // Si no se encontró el nombre en el localStorage, retorna un observable con valor por defecto
    if (!nombreusuario) {
      return of('null user');
    }
    return this.usuarioService.getUsuariobyNombre(nombreusuario).pipe(
      map((res) => {
        console.log('Respuesta del servicio:', res);
        return res['id'];
      }),
      catchError((err) => {
        this.errorMessage = 'Error al obtener el id del usuario: ' + err.message;
        return of('null user');
      })
    );
  }
}
