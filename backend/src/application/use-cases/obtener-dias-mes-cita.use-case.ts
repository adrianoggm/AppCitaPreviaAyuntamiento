import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IDepartamentoRepository } from '../../domain/interfaces/departamento-repository.interface';
import { ITecnicoRepository } from '../../domain/interfaces/tecnico-repository.interface';
import { ICitaRepository } from '../../domain/interfaces/cita-repository.interface';

/*
ObtenerDiasMesCitaUseCase obtinen todos los dias disponibles para un tipo.tramite  
para ello miro a que departamento o departamentos corresponde la lista de tramites que se encargan de ese tipo 
de tramites  posteriormente con el id.tecnico acoto la localizacion si me la proporcionan si no pues busco todos los 
tecnicos del departamento si no hay para esa localizacion debo sacar que no hay .  Si hay saco las Fechahora disponibles 
para ello creo un map[fecha_hora: idtecnicos]  buscando en la tabla de citas  construyendo desde la fecha_hora actual 
 hasta dentro de una semana. Las franjas de tiempo van de 8-14 en intervalos de 30 minutos  devuelve un set con las 
 fechashoras disponibles */
@Injectable()
export class ObtenerDiasMesCitaUseCase {
  constructor(
    @Inject('IDepartamentoRepository')
    private readonly departamentoRepository: IDepartamentoRepository,
    @Inject('ITecnicoRepository')
    private readonly tecnicoRepository: ITecnicoRepository,
    @Inject('ICitaRepository')
    private readonly citaRepository: ICitaRepository,
  ) {}

  async execute(tipoTramite: string, localizacion?: string): Promise<Set<string>> {
    // Buscar departamentos que gestionan el tipo de trámite
    const departamentos = await this.departamentoRepository.findDepartamentoByTipoTramite(tipoTramite);
    if (!departamentos || departamentos.length === 0) {
      throw new NotFoundException('No se encontraron departamentos para el tipo de trámite indicado.');
    }

    // Según la localización, buscar técnicos de los departamentos correspondientes
    console.log("DEPARTAMENTOS A BUSCAR", departamentos);
    const codigosDepartamento = departamentos.map(dep => dep.codigo);
    console.log("CODIGOS:", codigosDepartamento);
    
    let tecnicos;
    if (localizacion) {
      tecnicos = await this.tecnicoRepository.findByDepartamentosAndLocalizacion(codigosDepartamento, localizacion);
    } else {
      tecnicos = await this.tecnicoRepository.findByDepartamentos(codigosDepartamento);
    }
    if (!tecnicos || tecnicos.length === 0) {
      throw new NotFoundException('No hay técnicos disponibles para la localización o departamento indicado.');
    }
    console.log("Técnicos:", tecnicos);

    // Rango desde hoy hasta un mes adelante
    const now = new Date();
    const oneMonthAhead = new Date(now);
    oneMonthAhead.setMonth(now.getMonth() + 1);
    console.log("AHORA :", now, " EN UN MES:", oneMonthAhead);
    
    // Obtener todas las citas existentes en ese rango para los tecnicos encontrados
    const citas = await this.citaRepository.findBetweenDatesForTecnicos(now,oneMonthAhead,tecnicos.map(t => t.id));
    console.log("CITAS:", citas);

    // Conjunto para almacenar los días (YYYY-MM-DD) 
    const diasDisponibles = new Set<string>();

    // Se itera por cada día desde hoy hasta un mes adelante.
    for (let dia = new Date(now); dia < oneMonthAhead; dia.setDate(dia.getDate() + 1)) {
      let tieneDisponibilidad = false;
      // Se recorren las franjas horarias de 8:00 a 13:30 (la cita se considerará de 30 minutos).
      for (let hora = 8; hora < 14 && !tieneDisponibilidad; hora++) {
        for (let minute of [0, 30]) {   // un mes van a ser 30 dias 
          const slotDate = new Date(dia);
          slotDate.setHours(hora, minute, 0, 0);
          const slotISO = slotDate.toISOString();
          
          // Se filtran los tecnicos que ya tienen una cita en este slot
          const tecnicosOcupados = citas
            .filter(cita => new Date(cita.fechahora).toISOString() === slotISO)
            .map(cita => cita.idtecnico);
          
          // Se determinan los tecnicos disponibles en este dia
          const tecnicosDisponibles = tecnicos.map(tecnico => tecnico.id.toString())
            .filter(id => !tecnicosOcupados.includes(id));
          
          if (tecnicosDisponibles.length > 0) {
            tieneDisponibilidad = true;
            break; //si  lo encuentra salgo porque el trabajo de mirar la dispoibilidadd es de otra API 
          }
        }
      }
      if (tieneDisponibilidad) {
        const dateString = dia.toISOString().split('T')[0];
        diasDisponibles.add(dateString);
      }
    }
    console.log("Días disponibles:", diasDisponibles);
    return diasDisponibles;
  }
}





