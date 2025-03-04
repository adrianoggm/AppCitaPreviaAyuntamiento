import {CreateTecnicoDto} from "../dto/create-tecnico.dto";
import {Tecnico} from "../entities/tecnico.entity";

export interface ITecnicoRepository {
    // Crea un nuevo trámite pasandole el formato con el departamento . 
    createTecnico(tramite: CreateTecnicoDto): Promise<Tecnico>;
    findTecnicoByName( nombretecnico: string) : Promise<Tecnico|null>;
    findByDepartamentosAndLocalizacion(departamentos, localizacion):Promise<Tecnico[]>;
    findByDepartamentos(departamentos):Promise<Tecnico[]>;
    
    //findAllUsuarios( nombreusuario: string) : Promise<Usuario[]|null>;
}