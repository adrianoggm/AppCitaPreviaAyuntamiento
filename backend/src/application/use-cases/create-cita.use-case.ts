import { Injectable,Inject, NotFoundException, ConflictException,} from '@nestjs/common';
import { CreateCitaDto } from 'src/domain/dto/create-cita.dto';
import {ICitaRepository } from '../../domain/interfaces/cita-repository.interface'
import { Cita}       from '../../domain/entities/cita.entity'
import { ITecnicoRepository } from '../../domain/interfaces/tecnico-repository.interface';
import { ITramiteRepository } from '../../domain/interfaces/tramite-repository.interface';

import { IDepartamentoRepository } from '../../domain/interfaces/departamento-repository.interface';

@Injectable()
export class CreateCitaUseCase {
    constructor(
        @Inject('ICitaRepository')
        private readonly citaRepository: ICitaRepository,
        @Inject('ITecnicoRepository')
        private readonly tecnicoRepository: ITecnicoRepository, 
        @Inject('ITramiteRepository')
        private readonly tramiteRepository: ITramiteRepository,       
        @Inject('IDepartamentoRepository')
        private readonly departamentoRepository: IDepartamentoRepository,    
    ){}
//cambiarla para qie ahora cree si hay disponibilidad en esa localizacion 
    
/*async execute (CreateCitaDto: CreateCitaDto) : Promise<Cita> {
       // console.log("LLEEEGAAAAA ",CreateUsuarioDto);
        return this.citaRepository.createCita(CreateCitaDto);
    }*/
/* Creo una cita si existen tecnicos disponibles : 
 bajo la siguiente entrada
     {
    "idtramite": "67c95f686809983c73d298b6",
    "fechahora": "2025-03-06T13:00:00Z",
    "localizacion": "Granada"
    }
 busco primero en tramites para obtener el tipo de tramite. 
 Con el tipo de tramite busco que departamentos se encargan de dicho tramite.
 Cuando tengo los departamentos buscoo que tecnicos hay y luego veo en Citas 
 que citas tienen esos tecnicos ocupadas. Y saco una lista con los tecnicos que hay disponibles a esa hora.
 Si existe un tecnico disponible se crea la cita con los valores del dto + el departamento del tecnico y el id de este. 
*/
    async execute(createCitaDto: CreateCitaDto): Promise<Cita> {

        const { idtramite, fechahora, localizacion } = createCitaDto;
          
        const tramite = await this.tramiteRepository.findById(idtramite);
        if (!tramite) {
            throw new NotFoundException('Trámite no encontrado.');
        }
        const tipoTramite = tramite.tipoTramite;      
          
         // Busco departamentos que gestionen ese tipo de trámite
        const departamentos = await this.departamentoRepository.findDepartamentoByTipoTramite(tipoTramite);
        if (!departamentos || departamentos.length === 0) {
            throw new NotFoundException('No se encontraron departamentos para el tipo de trámite indicado.');
        }
        // Extraer los códigos de departamento
        const codigosDepartamento = departamentos.map(dep => dep.codigo);
        console.log("CODIGOS DEP:", codigosDepartamento);        

        // Busco  técnicos en base a los códigos de departamento  y localizacoon
        let tecnicos;
        if (localizacion) {
            tecnicos = await this.tecnicoRepository.findByDepartamentosAndLocalizacion(codigosDepartamento, localizacion);
            } else {
            tecnicos = await this.tecnicoRepository.findByDepartamentos(codigosDepartamento);
        }
        if (!tecnicos || tecnicos.length === 0) {
            throw new NotFoundException('No hay técnicos disponibles para el departamento o localización indicada.');
        }
         // Defino la fecha inicial a la fecha que me pasan y fecha fin del intervalo a 30 minutos despues.
        const fechaini = new Date(fechahora);
        const fechafin = new Date(fechaini);
        fechafin.setMinutes(fechaini.getMinutes() + 30);
        // Ontengo todas las citas existentes en ese rango para los técnicos encontrados
        const citas = await this.citaRepository.findBetweenDatesForTecnicos(fechaini,fechafin,tecnicos.map(t => t.id));
        console.log("CITAS DE LOS TECNICOS ", citas);
        const tecnicosOcupados = citas.map(cita => cita.idtecnico.toString()); // Tecnicos ocupados

        // Tecnicos disponibles son todos aquellos que no estan ocupadas para esa hora 
        const tecnicosDisponiblesIds = tecnicos.map(tecnico => tecnico.id.toString()).filter(id => !tecnicosOcupados.includes(id));
        console.log("TECNICOS DISPONIBLES", tecnicosDisponiblesIds);
            
        if (tecnicosDisponiblesIds.length === 0) {
            throw new ConflictException('No hay técnicos disponibles para esa franja horaria.');
        }
            
        //  Se coge el primer tecnico encontrado 
        const idtecnicoAsignado = tecnicosDisponiblesIds[0];
        const tecnicoAsignado = tecnicos.find(t => t.id.toString() === idtecnicoAsignado);
        if (!tecnicoAsignado) {
            throw new ConflictException('Técnico asignado no encontrado.');
        }
            
        const citaData = {...createCitaDto, estado: 'pendiente',idtecnico: idtecnicoAsignado,departamento: tecnicoAsignado.departamento,};
        return await this.citaRepository.createCita(citaData);
    }


} 