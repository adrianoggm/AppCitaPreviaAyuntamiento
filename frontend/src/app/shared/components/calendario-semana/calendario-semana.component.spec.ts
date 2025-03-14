import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioSemanaComponent } from './calendario-semana.component';

describe('CalendarioSemanaComponent', () => {
  let component: CalendarioSemanaComponent;
  let fixture: ComponentFixture<CalendarioSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioSemanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
