/*import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IDepartamentoRepository } from '../../domain/interfaces/departamento-repository.interface';
import { ITecnicoRepository } from '../../domain/interfaces/tecnico-repository.interface';
import { ICitaRepository } from '../../domain/interfaces/cita-repository.interface';

/*ObtenerHorasSemanaCitaUseCase obtinen todas las horas disponibles para un tipo.tramite  
para ello miro a que departamento o departamentos corresponde la lista de tramites que se encargan de ese tipo 
de tramites  posteriormente con el id.tecnico acoto la localizacion si me la proporcionan si no pues busco todos los 
tecnicos del departamento si no hay para esa localizacion debo sacar que no hay .  Si hay saco las Fechahora disponibles 
para ello creo un map[fecha_hora: idtecnicos]  buscando en la tabla de citas  construyendo desde la fecha_hora actual 
 hasta dentro de una semana. Las franjas de tiempo van de 8-14 en intervalos de 30 minutos  devuelve un set con las 
 fechashoras disponibles 
@Injectable()
export class ObtenerHorasSemanaCitaUseCase {
  constructor(
    @Inject('IDepartamentoRepository')
    private readonly departamentoRepository: IDepartamentoRepository,
    @Inject('ITecnicoRepository')
    private readonly tecnicoRepository: ITecnicoRepository,
    @Inject('ICitaRepository')
    private readonly citaRepository: ICitaRepository,
  ) {}

  async execute(tipoTramite: string, localizacion?: string): Promise<Map<string, string[]>> {
    // 1. Buscar departamentos que gestionan el tipo de trámite
    //
    const departamentos = await this.departamentoRepository.findByTipoTramite(tipoTramite);
    if (!departamentos || departamentos.length === 0) {
      throw new NotFoundException('No se encontraron departamentos para el tipo de trámite indicado.');
    }

    // 2. Con base en la localización: si se proporciona, buscar técnicos en esos departamentos y que tengan esa localización;
    // de lo contrario, obtener todos los técnicos de esos departamentos.
    let tecnicos;
    if (localizacion) {
      tecnicos = await this.tecnicoRepository.findByDepartamentosAndLocalizacion(departamentos, localizacion);
    } else {
      tecnicos = await this.tecnicoRepository.findByDepartamentos(departamentos);
    }
    if (!tecnicos || tecnicos.length === 0) {
      throw new NotFoundException('No hay técnicos disponibles para la localización o departamento indicado.');
    }

    // 3. Definir el rango de tiempo: desde ahora hasta una semana adelante
    const now = new Date();
    const oneWeekAhead = new Date(now);
    oneWeekAhead.setDate(now.getDate() + 7);

    // Obtener todas las citas existentes en ese rango para los técnicos encontrados
    const citas = await this.citaRepository.findBetweenDatesForTecnicos(now, oneWeekAhead, tecnicos.map(t => t.id));

    // 4. Construir el mapa de franjas horarias disponibles
    // El mapa tendrá claves que son strings con la fecha-hora en formato ISO y valores que son arrays de IDs de técnicos disponibles.
    const availableSlots = new Map<string, string[]>();

    // Suponemos que el rango de horario es de 8:00 a 14:00 (8, 8:30, ... hasta 13:30)
    // Iteramos por cada día del rango.
    for (let day = new Date(now); day <= oneWeekAhead; day.setDate(day.getDate() + 1)) {
      // Creamos una fecha base para el día actual (sin la hora)
      const dateString = day.toISOString().split('T')[0];
      // Iteramos por cada franja horaria (de 8:00 a 13:30)
      for (let hour = 8; hour < 14; hour++) {
        // Para cada hora, generamos dos franjas: :00 y :30 (excepto a las 14:00, se detiene en 13:30)
        for (let minute of [0, 30]) {
          // Construimos la fecha completa para la franja horaria
          const slotDate = new Date(day);
          slotDate.setHours(hour, minute, 0, 0);
          const slotISO = slotDate.toISOString();
          // Para esta franja, determinar cuáles técnicos están disponibles
          // Se filtran los técnicos que no tienen una cita asignada en ese mismo slot.
          const tecnicosOcupados = citas
            .filter(cita => new Date(cita.fechaHora).toISOString() === slotISO)
            .map(cita => cita.idTecnico);
          const tecnicosDisponibles = tecnicos
            .filter(tecnico => !tecnicosOcupados.includes(tecnico.id))
            .map(tecnico => tecnico.id);

          // Si hay técnicos disponibles, agregamos la franja al mapa
          if (tecnicosDisponibles.length > 0) {
            availableSlots.set(slotISO, tecnicosDisponibles);
          }
        }
      }
    }

    return availableSlots;
  }
}
*/





