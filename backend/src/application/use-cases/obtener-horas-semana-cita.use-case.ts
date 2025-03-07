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
    //  Buscar departamentos que gestionan el tipo de trámite
    const departamentos = await this.departamentoRepository.findDepartamentoByTipoTramite(tipoTramite);
    if (!departamentos || departamentos.length === 0) {
      throw new NotFoundException('No se encontraron departamentos para el tipo de trámite indicado.');
    }

    //  Con base en la localización: si se proporciona, buscar técnicos en esos departamentos y que tengan esa localizacióon de lo contrario
    //  obtener todos los técnicos de esos departamentos.

    console.log("DEPARTAMENTOS A BUSCAR", departamentos);
  
    // Extraer los códigos de departamento de cada departamento
    const codigosDepartamento = departamentos.map(dep => dep.codigodepartamento);
    console.log("CODIGOS:", codigosDepartamento);
    
    // Busco  técnicos en base a los códigos de departamento  y localizacoon
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
    // Rango de una semana en adelante 
    //El formateo a la hora local se hace en el controller asi no tenemos problemas en el back.

    const now = new Date();
    const oneWeekAhead = new Date(now);
    oneWeekAhead.setDate(now.getDate() + 7);
    console.log("AHORA :", now , " DESPUES : ",oneWeekAhead);
    
    // Ontengo todas las citas existentes en ese rango para los técnicos encontrados
    const citas = await this.citaRepository.findBetweenDatesForTecnicos(now, oneWeekAhead, tecnicos.map(t => t.id));
    console.log(citas)
    // Construir el map de franjas horarias disponibles
    // El map es la fecha-hora en formato ISO y valores  de IDs de técnicos disponibles.
    const horarioSlots = new Map<string, string[]>();
    //const horarioSlots = new Map<string, string[]>();
    // Suponemos que el rango de horario es de 8:00 a 14:00 (8, 8:30, ... hasta 13:30)
    //TODO CAMBIAR LAS  horas a INICIO_FRANJA_HORARIA FIN_FRANJA_HORARIA y e idem con los minutos.
    

    for (let dia = new Date(now); dia < oneWeekAhead; dia.setDate(dia.getDate() + 1)) {
    
      const dateString = dia.toISOString().split('T')[0];
      //console.log(dateString);
      // Itero por cada franja horaria de 8:00 a 13:30
      for (let hora = 8; hora < 14; hora++) {
        // Para cada hora, genero dos franjas: :00 y :30 se para en las 13:30 para que la cita sea 13:30 - 14
        for (let minute of [0, 30]) {
          // Construimos la fecha completa para la franja horaria
          const slotDate = new Date(dia);
          slotDate.setHours(hora, minute, 0, 0);
          const slotISO = slotDate.toISOString();
          //const slotISO = slotDate.toLocaleString();
          console.log(slotDate);


          horarioSlots.set(slotISO, tecnicos.map(t => t.id));
          //console.log(horarioSlots);
          // Se filtran los técnicos que no tienen una cita asignada en ese mismo slot.
          const tecnicosOcupados = citas
            .filter(cita => new Date(cita.fechahora).toISOString() === slotISO)
            .map(cita => cita.idtecnico);
          console.log("OCUPADO",tecnicosOcupados);

          const tecnicosDisponibles = tecnicos.map(tecnico => tecnico.id.toString())
        .filter(id => !tecnicosOcupados.includes(id));
      console.log("Técnicos disponibles:", tecnicosDisponibles);
          // Si hay técnicos disponibles, agregamos la franja al mapa
          if (tecnicosDisponibles.length > 0) {
            horarioSlots.set(slotISO, tecnicosDisponibles);
           
          }
        }
      }
    }
    console.log(horarioSlots);
   // const keysSet = new Set(horarioSlots.keys());
    return horarioSlots;
  }
}





