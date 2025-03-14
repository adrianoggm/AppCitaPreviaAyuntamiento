import { Injectable,Inject} from '@nestjs/common';
import { CreateTipoTramiteDto } from 'src/domain/dto/create-tipotramite.dto';
import {ITipoTramiteRepository } from '../../domain/interfaces/tipotramite-repository.interface'
import { TipoTramite}       from '../../domain/entities/tipotramite.entity'

//TODO aumentar los casos de uso como consultar el trámite 
//Caso de uso del trámite 
@Injectable()
export class CreateTipoTramiteUseCase {
    constructor(
        @Inject('ITipoTramiteRepository')
        private readonly tipotramiteRepository: ITipoTramiteRepository,
    ){}

    async execute (CreateTipoTramiteDto: CreateTipoTramiteDto) : Promise<TipoTramite> {
        return this.tipotramiteRepository.CreateTipoTramite(CreateTipoTramiteDto);
    }
} 