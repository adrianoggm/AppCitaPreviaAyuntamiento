import { Injectable, Inject } from '@nestjs/common';
import { IDepartamentoRepository } from '../../domain/interfaces/departamento-repository.interface';
import { Departamento } from '../../domain/entities/departamento.entity';

//CREAMOS el tecncip
@Injectable()
export class BuscarDepartamentoUseCase {
  constructor(
    @Inject('IDepartamentoRepository')
    private readonly departamentoRepository: IDepartamentoRepository
  ) {}

  async execute(nombre: string): Promise<Departamento | null> {
    console.log('Buscando departamento con nombre:', nombre);
    const departamento =
      await this.departamentoRepository.findDepartamentoByName(nombre);
    console.log('Departamento encontrado:', departamento);
    return departamento;
  }
}
