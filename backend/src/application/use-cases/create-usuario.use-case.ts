import { Injectable,Inject} from '@nestjs/common';
import { CreateUsuarioDto } from 'src/domain/dto/create-usuario.dto';
import {ITramiteRepository } from '../../domain/interfaces/tramite-repository.interface'
import { Usuario}       from '../../domain/entities/usuario.entity'

//TODO aumentar los casos de uso como consultar el trámite 
//Caso de uso del trámite 
@Injectable()
export class CreateTramiteUseCase {
    constructor(
        @Inject('ITramiteRepository')
        private readonly tramiteRepository: ITramiteRepository,
    ){}

    async execute (CreateUsuarioDto: CreateUsuarioDto) : Promise<Usuario> {
        return this.tramiteRepository.createTramite(CreateUsuarioDto);
    }
} 