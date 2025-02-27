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
    async findUsuarioByName(nombreusuario: string): Promise<Usuario|null>{
            console.log("USUARIO "+nombreusuario);
        return  await this.usuarioModel.findOne({nombreusuario: nombreusuario }).exec();
    }
    
}