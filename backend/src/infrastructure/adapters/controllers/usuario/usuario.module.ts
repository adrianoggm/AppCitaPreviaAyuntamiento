import { Module } from "@nestjs/common";
import { UsuarioController } from '../usuario.controller';
import { CreateUsuarioUseCase } from '../../../../application/use-cases/create-usuario.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from '../../../../domain/schemas/usuario.schema';
import { UsuarioRepository } from '../../../persistence/usuario.repository';
import { BuscarUsuarioUseCase } from "src/application/use-cases/buscar-usuario.use-case";
import { LoginUsuarioUseCase } from "src/application/use-cases/login-usuario.use-case";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    MongooseModule.forFeature([{ name: 'Usuario', schema: UsuarioSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'defaultSecret',
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [UsuarioController],
  providers: [
    CreateUsuarioUseCase,
    BuscarUsuarioUseCase,
    LoginUsuarioUseCase,
    {
      provide: 'IUsuarioRepository',
      useClass: UsuarioRepository,
    },
  ],
})
export class UsuarioModule {}
