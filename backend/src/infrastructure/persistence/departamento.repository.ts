import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Departamento } from '../../domain/entities/departamento.entity';
import { IDepartamentoRepository } from '../../domain/interfaces/departamento-repository.interface';
import { CreateDepartamentoDto } from '../../domain/dto/create-departamento.dto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
    constructor(@InjectModel('Departamento') private readonly departamentoModel: Model<Departamento>) {}

    async createDepartamento(departamento: CreateDepartamentoDto): Promise<Departamento> {
        const createddepartamento = new this.departamentoModel(departamento);
        return createddepartamento.save();
    }
    //async 
    /*
    async findAllDepartamentos(): Promise<Departamento[]|null> {
        const departamentos = await this.departamentoModel.find({}).exec();
        console.log('Departamentos en BD:', departamentos);
        return departamentos;
      }
        */
     
    
      async findDepartamentoByName(nombredepartamento: string): Promise<Departamento | null> {
        /*console.log("Buscando en la colección:", this.departamentoModel.collection.name);
        console.log("Valor de nombredepartamento recibido:", nombredepartamento);
        if(nombredepartamento!='departamento1232454'){
          console.log("Raro",typeof nombredepartamento);
        }
        const departamentos = await this.departamentoModel.find({nombredepartamento: 'departamento1232454' }).exec();
        console.log(departamentos);
        //console.log(departamentos[0]["nombredepartamento"]);
        */
        const departamentoDoc = await this.departamentoModel.findOne({ nombredepartamento }).exec();
        //console.log("Nombre ",nombredepartamento)
        //console.log("Resultado de la consulta:", departamentoDoc);
        return departamentoDoc ? departamentoDoc.toJSON() : null;
      }

      async findDepartamentoByTipoTramite(tipoTramite: string): Promise<Departamento[]> {
        return await this.departamentoModel.find({ TipoTramites: tipoTramite }).exec();
      }
      
      
      
    
}