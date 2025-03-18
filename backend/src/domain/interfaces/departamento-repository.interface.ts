import {CreateDepartamentoDto} from "../dto/create-departamento.dto";
import {Departamento} from "../entities/departamento.entity";

export interface IDepartamentoRepository {
    // Crea un nuevo trámite pasandole el formato con el departamento . 
    createDepartamento(departamento: CreateDepartamentoDto): Promise<Departamento>;
    findDepartamentoByName( nombre: string) : Promise<Departamento|null>;
    findDepartamentoByTipoTramite(tipoTramite: string): Promise<Departamento[]> ;
    //findAllUsuarios( nombreusuario: string) : Promise<Usuario[]|null>;
    
}