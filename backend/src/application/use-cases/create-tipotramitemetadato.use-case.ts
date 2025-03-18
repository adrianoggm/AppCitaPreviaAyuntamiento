import { Injectable,Inject} from '@nestjs/common';
import { CreateTipoTramiteMetadatoDto } from 'src/domain/dto/create-tipotramitemetadato.dto';
import {ITipoTramiteMetadatoRepository } from '../../domain/interfaces/tipotramitemetadato-repository.interface'
import { TipoTramiteMetadato}       from '../../domain/entities/tipotramitemetadato.entity'

//TODO aumentar los casos de uso como consultar el trámite 
//Caso de uso del trámite 
@Injectable()
export class CreateTipoTramiteMetadatoUseCase{
    constructor(
        @Inject('ITipoTramiteMetadatoRepository')
        private readonly tipotramitemetadatoRepository: ITipoTramiteMetadatoRepository,
    ){}

    async execute (CreateTipoTramiteMetadatoDto: CreateTipoTramiteMetadatoDto) : Promise<TipoTramiteMetadato> {
        return this.tipotramitemetadatoRepository.CreateTipoTramiteMetadato(CreateTipoTramiteMetadatoDto);
    }
} 