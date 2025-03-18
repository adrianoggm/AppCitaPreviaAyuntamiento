import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TipoTramiteMetadato } from '../../domain/entities/tipotramitemetadato.entity';
import { ITipoTramiteMetadatoRepository } from '../../domain/interfaces/tipotramitemetadato-repository.interface';
import { CreateTipoTramiteMetadatoDto } from '../../domain/dto/create-tipotramitemetadato.dto';

@Injectable()
export class TipoTramiteMetadatoRepository implements ITipoTramiteMetadatoRepository {
  constructor(@InjectModel('TipoTramiteMetadato') private readonly tramiteModel: Model<TipoTramiteMetadato>) {}

  async CreateTipoTramiteMetadato(tramite: CreateTipoTramiteMetadatoDto): Promise<TipoTramiteMetadato> {
    const createdTipoTramiteMetadato = new this.tramiteModel(tramite);
    return createdTipoTramiteMetadato.save();
  }
}
