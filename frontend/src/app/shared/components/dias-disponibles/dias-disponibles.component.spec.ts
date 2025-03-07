import {  TestBed } from '@angular/core/testing';
import { DiasDisponiblesComponent } from './dias-disponibles.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';



describe('DiasDisponiblesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiasDisponiblesComponent],
      providers: [
        provideHttpClient(),       // Provee HttpClient
        provideHttpClientTesting() // Provee las utilidades para testing de HttpClient
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DiasDisponiblesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});