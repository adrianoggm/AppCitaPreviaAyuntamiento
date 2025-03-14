// src/app/features/crear-tramite/crear-tramite.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TramiteService } from '../../../core/services/tramite.service';

@Component({
  selector: 'app-crear-tramite',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-tramite.component.html',
  styleUrls: ['./crear-tramite.component.scss']
})
export class CrearTramiteComponent implements OnInit {
  createTramiteForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private tramiteService: TramiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createTramiteForm = this.fb.group({
      // Únicamente se selecciona el tipo de trámite desde el front-end.
      tipoTramite: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.createTramiteForm.valid) {
      // El servicio completará los demás campos (idusuario, estado, código, observaciones y documentos)
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
