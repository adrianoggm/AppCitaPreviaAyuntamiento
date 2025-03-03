import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tecnico } from '../../domain/entities/tecnico.entity';
import { ITecnicoRepository } from '../../domain/interfaces/tecnico-repository.interface';
import { CreateTecnicoDto } from '../../domain/dto/create-tecnico.dto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class TecnicoRepository implements ITecnicoRepository {
    constructor(@InjectModel('Tecnico') private readonly tecnicoModel: Model<Tecnico>) {}

    async createTecnico(tecnico: CreateTecnicoDto): Promise<Tecnico> {
        const createdtecnico = new this.tecnicoModel(tecnico);
        return createdtecnico.save();
    }
    //async 
    /*
    async findAllTecnicos(): Promise<Tecnico[]|null> {
        const tecnicos = await this.tecnicoModel.find({}).exec();
        console.log('Tecnicos en BD:', tecnicos);
        return tecnicos;
      }
        */
     
    
      async findTecnicoByName(nombretecnico: string): Promise<Tecnico | null> {
        /*console.log("Buscando en la colección:", this.tecnicoModel.collection.name);
        console.log("Valor de nombretecnico recibido:", nombretecnico);
        if(nombretecnico!='tecnico1232454'){
          console.log("Raro",typeof nombretecnico);
        }
        const tecnicos = await this.tecnicoModel.find({nombretecnico: 'tecnico1232454' }).exec();
        console.log(tecnicos);
        //console.log(tecnicos[0]["nombretecnico"]);
        */
        const tecnicoDoc = await this.tecnicoModel.findOne({ nombretecnico }).exec();
        //console.log("Nombre ",nombretecnico)
        //console.log("Resultado de la consulta:", tecnicoDoc);
        return tecnicoDoc ? tecnicoDoc.toJSON() : null;
      }
      
      
      
      
    
}