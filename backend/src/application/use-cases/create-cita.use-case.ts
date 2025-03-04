import { Injectable,Inject} from '@nestjs/common';
import { CreateCitaDto } from 'src/domain/dto/create-cita.dto';
import {ICitaRepository } from '../../domain/interfaces/cita-repository.interface'
import { Cita}       from '../../domain/entities/cita.entity'


@Injectable()
export class CreateCitaUseCase {
    constructor(
        @Inject('ICitaRepository')
        private readonly citaRepository: ICitaRepository,
    ){}

    async execute (CreateCitaDto: CreateCitaDto) : Promise<Cita> {
       // console.log("LLEEEGAAAAA ",CreateUsuarioDto);
        return this.citaRepository.createCita(CreateCitaDto);
    }


} 