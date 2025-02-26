import { Injectable,Inject} from '@nestjs/common';
import { CreateTramiteDto } from 'src/domain/dto/create-tramite.dto';
import {ITramiteRepository } from '../../domain/interfaces/tramite-repository.interface'
import { Tramite}       from '../../domain/entities/tramite.entity'

//TODO aumentar los casos de uso como consultar el trámite 
//Caso de uso del trámite 
@Injectable()
export class CreateTramiteUseCase {
    constructor(
        @Inject('ITramiteRepository')
        private readonly tramiteRepository: ITramiteRepository,
    ){}

    async execute (CreateTramiteDto: CreateTramiteDto) : Promise<Tramite> {
        return this.tramiteRepository.createTramite(CreateTramiteDto);
    }
} 