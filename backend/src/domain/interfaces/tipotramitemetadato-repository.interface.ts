import {CreateTipoTramiteMetadatoDto} from "../dto/create-tipotramitemetadato.dto";
import {TipoTramiteMetadato} from "../entities/tipotramitemetadato.entity";

export interface ITipoTramiteMetadatoRepository {

    CreateTipoTramiteMetadato(tramite: CreateTipoTramiteMetadatoDto): Promise<TipoTramiteMetadato>;

}