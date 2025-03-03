import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tramite } from '../../domain/entities/tramite.entity';
import { ITramiteRepository } from '../../domain/interfaces/tramite-repository.interface';
import { CreateTramiteDto } from '../../domain/dto/create-tramite.dto';

@Injectable()
export class TramiteRepository implements ITramiteRepository {
    constructor(@InjectModel('Tramite') private readonly tramiteModel: Model<Tramite>) {}
    
    async createTramite(tramite: CreateTramiteDto): Promise<Tramite> {
        const createdTramite = new this.tramiteModel(tramite);
        return createdTramite.save();
    }

    async findTramites(filtros: { tipoTramite?: string; idusuario?: string; idtecnico?: string }): Promise<Tramite[]> {
        const query: any = {};
        if (filtros.tipoTramite) {
          query.tipoTramite = filtros.tipoTramite;
        }
        if (filtros.idusuario) {
          query.idusuario = filtros.idusuario;
        }
        if (filtros.idtecnico) {
          query.idtecnico = filtros.idtecnico;
        }
        //console.log("Consulta generada:", query);
        const tramites = await this.tramiteModel.find(query).exec();
        //console.log("Consulta generada:", tramites);
        return tramites.map(doc => doc.toJSON());
      }
}