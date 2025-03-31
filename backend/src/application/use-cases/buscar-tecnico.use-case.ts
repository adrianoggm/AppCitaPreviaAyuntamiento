import { Injectable, Inject } from '@nestjs/common';
import { ITecnicoRepository } from '../../domain/interfaces/tecnico-repository.interface';
import { Tecnico } from '../../domain/entities/tecnico.entity';

//CREAMOS el tecncip
@Injectable()
export class BuscarTecnicoUseCase {
  constructor(
    @Inject('ITecnicoRepository')
    private readonly tecnicoRepository: ITecnicoRepository
  ) {}

  async execute(nombretecnico: string): Promise<Tecnico | null> {
    console.log('Buscando tecnico con nombre:', nombretecnico);
    const tecnico =
      await this.tecnicoRepository.findTecnicoByName(nombretecnico);
    console.log('Tecnico encontrado:', tecnico);
    return tecnico;
  }
}
