// src/application/use-cases/get-tipotramite-names.use-case.ts
import { Injectable,Inject} from '@nestjs/common';
import { ITipoTramiteRepository } from '../../domain/interfaces/tipotramite-repository.interface';


@Injectable()
export class GetTipoTramiteNombresUseCase {
  constructor(
    @Inject('ITipoTramiteRepository')
    private readonly tipoTramiteRepository: ITipoTramiteRepository,
  ) {}

  async execute(): Promise<string[]> {
    return await this.tipoTramiteRepository.getAllTipoTramiteNombres();
  }
}