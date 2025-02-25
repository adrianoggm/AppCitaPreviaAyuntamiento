import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tramite } from '../../domain/entities/tramite.entity';
import { ITramiteRepository } from '../../domain/interfaces/tramite-repository.interface';
import { CreateTramiteDto } from '../adapters/controllers/tramite/dto/create-tramite.dto';

@Injectable()
export class TramiteRepository implements ITramiteRepository {
    constructor(@InjectModel('Tramite') private readonly tramiteModel: Model<Tramite>) {}

    async createTramite(tramite: CreateTramiteDto): Promise<Tramite> {
        const createdTramite = new this.tramiteModel(tramite);
        return createdTramite.save();
    }
}