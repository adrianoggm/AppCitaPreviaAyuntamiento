import {CreateDepartamentoDto} from "../dto/create-departamento.dto";
import {Departamento} from "../entities/departamento.entity";

export interface IDepartamentoRepository {
    // Crea un nuevo trámite pasandole el formato con el departamento . 
    createDepartamento(departamento: CreateDepartamentoDto): Promise<Departamento>;
    findDepartamentoByName( nombredepartamento: string) : Promise<Departamento|null>;
    //findAllUsuarios( nombreusuario: string) : Promise<Usuario[]|null>;
}