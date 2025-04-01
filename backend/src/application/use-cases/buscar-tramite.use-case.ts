import { Injectable, Inject } from '@nestjs/common';
import { ITramiteRepository } from '../../domain/interfaces/tramite-repository.interface';
import { Tramite } from '../../domain/entities/tramite.entity';

//TODO aumentar los casos de uso como consultar el trámite
//Caso de uso del trámite
@Injectable()
export class BuscarTramiteUseCase {
  constructor(
    @Inject('ITramiteRepository')
    private readonly tramiteRepository: ITramiteRepository
  ) {}

  async execute(filtros: {
    tipoTramite?: string;
    idusuario?: string;
    idtecnico?: string;
  }): Promise<Tramite[]> {
    return await this.tramiteRepository.findTramites(filtros);
  }
}
