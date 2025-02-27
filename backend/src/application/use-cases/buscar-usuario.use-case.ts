
import { Injectable,Inject} from '@nestjs/common';
import {IUsuarioRepository } from '../../domain/interfaces/usuario-repository.interface'
import { Usuario}       from '../../domain/entities/usuario.entity'

//TODO aumentar los casos de uso como consultar el trámite 
//Caso de uso del trámite 
//CREAMOS EL USUARIOS 
@Injectable()
export class BuscarUsuarioUseCase {
    constructor(
        @Inject('IUsuarioRepository')
        private readonly usuarioRepository: IUsuarioRepository,
    ){}

    async execute(nombreusuario: string): Promise<Usuario|null> {
       const  usario= await this.usuarioRepository.findUsuarioByName(nombreusuario);
        return usario;
    }

} 
