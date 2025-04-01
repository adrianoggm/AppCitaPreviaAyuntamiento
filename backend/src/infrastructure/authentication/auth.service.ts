import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioRepository } from '../persistence/usuario.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDto } from 'src/domain/dto/login-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginUsuarioDto): Promise<{ access_token: string }> {
    const { nombreusuario, contrasena } = loginDto;
    
    // Buscar el usuario a través del repositorio
    const user = await this.usuarioRepository.findUsuarioByName(nombreusuario);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Comparar la contraseña (usa bcrypt en producción)
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Crear el payload y generar el token JWT
    const payload = { sub: user.id, nombreusuario: user.nombreusuario };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
