
import { Injectable, Inject } from '@nestjs/common';
import { ITipoTramiteRepository } from '../../domain/interfaces/tipotramite-repository.interface';
import { TipoTramite} from '../../domain/entities/tipotramite.entity'

@Injectable()
export class GetNombreTramitesTipoTramitesUseCase {
  constructor(
    @Inject('ITipoTramiteRepository')
    private readonly tipoTramiteRepository: ITipoTramiteRepository,
  ) {}

  /**
   * Ejecuta la lógica para construir un mapa donde cada clave es un nombre de trámite y
   * el valor correspondiente es el nombretipotramite asociado.
   *
   * Mapa de nombretramite => nombretipotramite.
   */
  async execute(): Promise<{ [nombreTramite: string]: string }> {
    // Se obtienen todos los registros de TipoTramite desde la base de datos
    const tipoTramites: TipoTramite[] = await this.tipoTramiteRepository.findAll();
    //nombretramites nombretipotramite
    // Se construye el mapa iterando cada registro y sus nombres asociados
    const map: { [nombreTramite: string]: string } = {};
    tipoTramites.forEach(tipo => {
      tipo.nombretramites.forEach(nombre => {
        map[nombre] = tipo.nombretipotramite;
      });
    });

    return map;
  }
}
