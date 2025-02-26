import { Module } from "@nestjs/common";
import { UsuarioController } from '../usuario.controller';
import { CreateUsuarioUseCase  } from '../../../../application/use-cases/create-usuario.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from '../../../../domain/schemas/usuario.schema';
import { UsuarioRepository  } from '../../../persistence/usuario.repository';


@Module({
    imports: [
      MongooseModule.forFeature([{ name:'Tramite',schema: UsuarioSchema }]),
    ],
    controllers: [UsuarioController],
    providers: [CreateUsuarioUseCase ,
      {
        provide: 'IUsuarioRepository',
        useClass: UsuarioRepository,
    },],
})
export class TramiteModule {}