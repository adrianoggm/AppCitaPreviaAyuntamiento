import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUsuarioDto } from 'src/domain/dto/login-usuario.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUsuarioUseCase {
  constructor(
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
    private readonly jwtService: JwtService
  ) {}

  async execute(loginUsuarioDto: LoginUsuarioDto): Promise<{ token: string }> {
    const { nombreusuario, contrasena } = loginUsuarioDto;

    // Buscar el usuario por nombre de usuario
    const user = await this.usuarioModel.findOne({ nombreusuario });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar la contraseña usando bcrypt
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Crear el payload para el token
    const payload = { id: user._id, nombreusuario: user.nombreusuario };

    // Generar el token JWT
    const token = this.jwtService.sign(payload);
    console.log(token);
    return { token };
  }
}
