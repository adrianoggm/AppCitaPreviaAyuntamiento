// src/app/shared/components/crear-tramite/crear-tramite.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-tramite',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-tramite.component.html',
  styleUrls: ['./crear-tramite.component.scss']
})
export class CrearTramiteComponent implements OnInit {
  // Le indicamos a TypeScript que esta propiedad se asignará en ngOnInit
  createTramiteForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createTramiteForm = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      idusuario: ['', Validators.required],
      codigo: ['', Validators.required],
      tipoTramite: ['', Validators.required],
      observaciones: [''],
      // documentos es un array opcional de strings
      documentos: this.fb.array([])
    });
  }

  get documentos(): FormArray {
    return this.createTramiteForm.get('documentos') as FormArray;
  }

  addDocumento(): void {
    this.documentos.push(this.fb.control(''));
  }

  removeDocumento(index: number): void {
    this.documentos.removeAt(index);
  }

  onSubmit(): void {
    if (this.createTramiteForm.valid) {
      // Aquí se llamaría al servicio para crear el trámite
      console.log('Datos del trámite:', this.createTramiteForm.value);
    }
  }
}
