import { Injectable,Inject} from '@nestjs/common';
import { CreateTecnicoDto } from 'src/domain/dto/create-tecnico.dto';
import {ITecnicoRepository } from '../../domain/interfaces/tecnico-repository.interface'
import { Tecnico}       from '../../domain/entities/tecnico.entity'


@Injectable()
export class CreateTecnicoUseCase {
    constructor(
        @Inject('ITecnicoRepository')
        private readonly tecnicoRepository: ITecnicoRepository,
    ){}

    async execute (CreateTecnicoDto: CreateTecnicoDto) : Promise<Tecnico> {
       // console.log("LLEEEGAAAAA ",CreateUsuarioDto);
        return this.tecnicoRepository.createTecnico(CreateTecnicoDto);
    }


} 