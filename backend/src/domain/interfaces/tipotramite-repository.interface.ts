import {CreateTipoTramiteDto} from "../dto/create-tipotramite.dto";
import {TipoTramite} from "../entities/tipotramite.entity";

export interface ITipoTramiteRepository {

    CreateTipoTramite(tramite: CreateTipoTramiteDto): Promise<TipoTramite>;
    getAllTipoTramiteNombres(): Promise<string[]>;
    findAll(): Promise<TipoTramite[]>;
}