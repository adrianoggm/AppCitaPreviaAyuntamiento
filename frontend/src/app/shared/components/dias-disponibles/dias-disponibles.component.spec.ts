import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiasDisponiblesComponent } from './dias-disponibles.component';
import { CitaService } from '../../../core/services/cita.service';


describe('DiasDisponiblesComponent', () => {
  let component: DiasDisponiblesComponent;
  let fixture: ComponentFixture<DiasDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiasDisponiblesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
