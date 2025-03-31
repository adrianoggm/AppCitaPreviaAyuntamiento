import { Injectable, Inject } from '@nestjs/common';
import { CreateDepartamentoDto } from 'src/domain/dto/create-departamento.dto';
import { IDepartamentoRepository } from '../../domain/interfaces/departamento-repository.interface';
import { Departamento } from '../../domain/entities/departamento.entity';

@Injectable()
export class CreateDepartamentoUseCase {
  constructor(
    @Inject('IDepartamentoRepository')
    private readonly departamentoRepository: IDepartamentoRepository
  ) {}

  async execute(
    CreateDepartamentoDto: CreateDepartamentoDto
  ): Promise<Departamento> {
    // console.log("LLEEEGAAAAA ",CreateUsuarioDto);
    return this.departamentoRepository.createDepartamento(
      CreateDepartamentoDto
    );
  }
}
