import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IDepartamentoRepository } from '../../domain/interfaces/departamento-repository.interface';
import { ITecnicoRepository } from '../../domain/interfaces/tecnico-repository.interface';
import { ICitaRepository } from '../../domain/interfaces/cita-repository.interface';

/*
ObtenerHorasSemanaCitaUseCase obtinen todas las horas disponibles para un tipo.tramite  
para ello miro a que departamento o departamentos corresponde la lista de tramites que se encargan de ese tipo 
de tramites  posteriormente con el id.tecnico acoto la localizacion si me la proporcionan si no pues busco todos los 
tecnicos del departamento si no hay para esa localizacion debo sacar que no hay .  Si hay saco las Fechahora disponibles 
para ello creo un map[fecha_hora: idtecnicos]  buscando en la tabla de citas  construyendo desde la fecha_hora actual 
 hasta dentro de una semana. Las franjas de tiempo van de 8-14 en intervalos de 30 minutos  devuelve un set con las 
 fechashoras disponibles */
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
    // Buscar departamentos que gestionan el tipo de trámite
    const departamentos = await this.departamentoRepository.findDepartamentoByTipoTramite(tipoTramite);
    if (!departamentos || departamentos.length === 0) {
      throw new NotFoundException('No se encontraron departamentos para el tipo de trámite indicado.');
    }
    console.log("DEPARTAMENTOS A BUSCAR", departamentos);
  
    // Extraer los códigos de departamento
    const codigosDepartamento = departamentos.map(dep => dep.codigodepartamento);
    console.log("CODIGOS:", codigosDepartamento);
  
    // Buscar técnicos en base a los departamentos (y localización, si se proporciona)
    let tecnicos;
    if (localizacion) {
      tecnicos = await this.tecnicoRepository.findByDepartamentosAndLocalizacion(codigosDepartamento, localizacion);
    } else {
      tecnicos = await this.tecnicoRepository.findByDepartamentos(codigosDepartamento);
    }
    if (!tecnicos || tecnicos.length === 0) {
      throw new NotFoundException('No hay técnicos disponibles para la localización o departamento indicado.');
    }
    console.log("Tecnicos:", tecnicos);
  
    // Rango: desde ahora hasta un mes adelante
    const now = new Date();
    const oneMonthAhead = new Date(now);
    oneMonthAhead.setMonth(now.getMonth() + 1);
    console.log("AHORA :", now, " EN UN MES:", oneMonthAhead);
  
    // Obtener todas las citas existentes en ese rango para los técnicos encontrados
    const citas = await this.citaRepository.findBetweenDatesForTecnicos(now, oneMonthAhead, tecnicos.map(t => t.id));
    console.log("CITAS:", citas);
  
    // Construir el Map de franjas horarias disponibles
    // Cada key es una franja horaria (ISO) y el value es el array de IDs de técnicos disponibles
    const horarioSlots = new Map<string, string[]>();
  
    // Suponemos que el rango de horario es de 8:00 a 14:00 (último turno a las 13:30)
    for (let dia = new Date(now); dia < oneMonthAhead; dia.setDate(dia.getDate() + 1)) {
      // Iterar por cada franja horaria de 8:00 a 13:30
      for (let hora = 8; hora < 14; hora++) {
        // Para cada hora, generar dos franjas: :00 y :30
        for (let minute of [0, 30]) {
          // Construir la fecha completa para la franja horaria
          const slotDate = new Date(dia);
          slotDate.setHours(hora, minute, 0, 0);
          const slotISO = slotDate.toISOString();
  
          // Filtrar los técnicos que ya tienen una cita asignada en este slot
          const tecnicosOcupados = citas
            .filter(cita => new Date(cita.fechahora).toISOString() === slotISO)
            .map(cita => cita.idtecnico);
  
          // Calcular los técnicos disponibles: aquellos que NO estén ocupados
          const tecnicosDisponibles = tecnicos.map(tecnico => tecnico.id.toString())
            .filter(id => !tecnicosOcupados.includes(id));
  
          // Solo se añade el slot si hay al menos un técnico disponible
          if (tecnicosDisponibles.length > 0) {
            horarioSlots.set(slotISO, tecnicosDisponibles);
          }
        }
      }
    }
  
    console.log(horarioSlots);
    return horarioSlots;
  }
  
  
  
  
}





