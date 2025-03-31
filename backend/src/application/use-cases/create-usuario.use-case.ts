import { Injectable, Inject } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/domain/dto/create-usuario.dto';
import { IUsuarioRepository } from '../../domain/interfaces/usuario-repository.interface';
import { Usuario } from '../../domain/entities/usuario.entity';

//TODO aumentar los casos de uso como consultar el trámite
//Caso de uso del trámite
//CREAMOS EL USUARIOS
@Injectable()
export class CreateUsuarioUseCase {
  constructor(
    @Inject('IUsuarioRepository')
    private readonly usuarioRepository: IUsuarioRepository
  ) {}

  async execute(CreateUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // console.log("LLEEEGAAAAA ",CreateUsuarioDto);
    return this.usuarioRepository.createUsuario(CreateUsuarioDto);
  }
}
