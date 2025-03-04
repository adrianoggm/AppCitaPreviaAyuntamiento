import {CreateCitaDto} from "../dto/create-cita.dto";
import {Cita} from "../entities/cita.entity";

export interface ICitaRepository {
    // Crea un nuevo trámite pasandole el formato con el departamento . 
    createCita(departamento: CreateCitaDto): Promise<Cita>;
    //findDepartamentoByName( nombredepartamento: string) : Promise<Departamento|null>;
    //findDepartamentoByTipoTramite(tipoTramite: string): Promise<Departamento[]> ;
    //findAllUsuarios( nombreusuario: string) : Promise<Usuario[]|null>;
}