import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TipoTramite } from '../../domain/entities/tipotramite.entity';
import { ITipoTramiteRepository } from '../../domain/interfaces/tipotramite-repository.interface';
import { CreateTipoTramiteDto } from '../../domain/dto/create-tipotramite.dto';

@Injectable()
export class TipoTramiteRepository implements ITipoTramiteRepository {
  constructor(@InjectModel('TipoTramite') private readonly tramiteModel: Model<TipoTramite>) {}

  async CreateTipoTramite(tramite: CreateTipoTramiteDto): Promise<TipoTramite> {
    const createdTipoTramite = new this.tramiteModel(tramite);
    return createdTipoTramite.save();
  }
  async getAllTipoTramiteNombres(): Promise<string[]> {
    const results = await this.tramiteModel.find({}, 'nombretipotramite').exec();
    return results.map(item => item.nombretipotramite);
  }

  async findAll(): Promise<TipoTramite[]> {
    return this.tramiteModel.find().exec();
  }
}
