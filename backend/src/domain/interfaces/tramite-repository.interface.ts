import {CreateTramiteDto} from "../dto/create-tramite.dto";
import {Tramite} from "../entities/tramite.entity";

export interface ITramiteRepository {
    // Crea un nuevo trámite pasandole el formato con el departamento . 
    createTramite(tramite: CreateTramiteDto): Promise<Tramite>;
    findTramites(filtros: { tipoTramite?: string; idusuario?: string; idtecnico?: string } ): Promise<Tramite[]>;
    findById(idtramite: string):Promise<Tramite|null>;
}