import { Injectable,Inject} from '@nestjs/common';
import {IDepartamentoRepository } from '../../domain/interfaces/departamento-repository.interface'
import { Departamento}       from '../../domain/entities/departamento.entity'


//CREAMOS el tecncip
@Injectable()
export class BuscarDepartamentobyTipoTramiteUseCase {
    constructor(
        @Inject('IDepartamentoRepository')
        private readonly departamentoRepository: IDepartamentoRepository,
    ){}

    async execute(tipotramite: string): Promise<Departamento[]> {
        console.log("Buscando departamento con este tramite: ", tipotramite);
        const departamento = await this.departamentoRepository.findDepartamentoByTipoTramite(tipotramite);
        console.log("Departamento encontrado:", departamento);
        return departamento;
      }
    

} 