import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from'../../domain/schemas/usuario.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioModule } from '../adapters/controllers/usuario/usuario.module';
import { jwtConstants } from './jwtconstants';
import { UsuarioRepository } from '../persistence/usuario.repository';

@Module({
  imports: [
    UsuarioModule,
    // Se registra el modelo para que el token 'Usuario' (usado por @InjectModel) esté disponible
    MongooseModule.forFeature([{ name: 'Usuario', schema: UsuarioSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' }, //UN DIA 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsuarioRepository],
  exports: [AuthService],
})
export class AuthModule {}
