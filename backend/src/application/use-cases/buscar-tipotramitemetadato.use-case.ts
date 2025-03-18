import { Injectable,Inject} from '@nestjs/common';
import {ITipoTramiteMetadatoRepository } from '../../domain/interfaces/tipotramitemetadato-repository.interface'
import { TipoTramiteMetadato}       from '../../domain/entities/tipotramitemetadato.entity'

//TODO aumentar los casos de uso como consultar el trámite 
//Caso de uso del trámite 
@Injectable()
export class BuscarTipoTramiteMetadatoUseCase{
    constructor(
        @Inject('ITipoTramiteMetadatoRepository')
        private readonly tipotramitemetadatoRepository: ITipoTramiteMetadatoRepository,
    ){}

    async execute(nombre: string): Promise<TipoTramiteMetadato | null> {
        console.log("Buscando tecnico con nombre:", nombre);
        const tipotramitemetadato = await  this.tipotramitemetadatoRepository.findTipoTramiteMetadatoByName(nombre);
        console.log("Tecnico encontrado:", tipotramitemetadato);
        return tipotramitemetadato;
      }
} 
