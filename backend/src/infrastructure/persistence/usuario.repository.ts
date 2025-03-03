import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from '../../domain/entities/usuario.entity';
import { IUsuarioRepository } from '../../domain/interfaces/usuario-repository.interface';
import { CreateUsuarioDto } from '../../domain/dto/create-usuario.dto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
    constructor(@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>) {}

    async createUsuario(usuario: CreateUsuarioDto): Promise<Usuario> {
        const createdusuario = new this.usuarioModel(usuario);
        return createdusuario.save();
    }
    //async 
    /*
    async findAllUsuarios(): Promise<Usuario[]|null> {
        const usuarios = await this.usuarioModel.find({}).exec();
        console.log('Usuarios en BD:', usuarios);
        return usuarios;
      }
        */
     
    
      async findUsuarioByName(nombreusuario: string): Promise<Usuario | null> {
        /*console.log("Buscando en la colección:", this.usuarioModel.collection.name);
        console.log("Valor de nombreusuario recibido:", nombreusuario);
        if(nombreusuario!='usuario1232454'){
          console.log("Raro",typeof nombreusuario);
        }
        const usuarios = await this.usuarioModel.find({nombreusuario: 'usuario1232454' }).exec();
        console.log(usuarios);
        //console.log(usuarios[0]["nombreusuario"]);
        */
        const usuarioDoc = await this.usuarioModel.findOne({ nombreusuario }).exec();
        console.log("Resultado de la consulta:", usuarioDoc);
        return usuarioDoc ? usuarioDoc.toJSON() : null;
      }
      
      
      
      
    
}