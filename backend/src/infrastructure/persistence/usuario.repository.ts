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
     
    async findUsuarioByName(nombreusuario1: string): Promise<Usuario | null> {
        console.log(nombreusuario1)
        const usuarioDoc = await this.usuarioModel.findOne({ "nombreusuario": nombreusuario1 }).exec();
        console.log(usuarioDoc)
        return usuarioDoc ? usuarioDoc.toJSON() : null;
      }
      
      
      
    
}