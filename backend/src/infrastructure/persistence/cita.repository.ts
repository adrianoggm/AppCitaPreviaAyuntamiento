import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cita } from '../../domain/entities/cita.entity';
import { ICitaRepository } from '../../domain/interfaces/cita-repository.interface';
import { CreateCitaDto } from '../../domain/dto/create-cita.dto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class CitaRepository implements ICitaRepository {
    constructor(@InjectModel('Cita') private readonly citaModel: Model<Cita>) {}

    async createCita(cita: CreateCitaDto): Promise<Cita> {
        const createdcita = new this.citaModel(cita);
        return createdcita.save();
    }
   
    async findBetweenDatesForTecnicos(startDate: Date, endDate: Date, tecnicosIds: string[]): Promise<Cita[]> {
        console.log(startDate, endDate, tecnicosIds)
        return await this.citaModel.find({
            idtecnico: { $in: tecnicosIds },
            fechahora: { $gte: startDate.toISOString(), $lte: endDate.toISOString() }
        }).exec();
    }
}