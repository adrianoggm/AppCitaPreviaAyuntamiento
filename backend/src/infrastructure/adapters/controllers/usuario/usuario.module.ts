import { Module } from "@nestjs/common";
import { UsuarioController } from '../usuario.controller';
import { CreateUsuarioUseCase  } from '../../../../application/use-cases/create-usuario.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from '../../../../domain/schemas/usuario.schema';
import { UsuarioRepository  } from '../../../persistence/usuario.repository';
import { BuscarUsuarioUseCase } from "src/application/use-cases/buscar-usuario.use-case";


@Module({
    imports: [
      MongooseModule.forFeature([{ name:'Usuario',schema: UsuarioSchema }]),
    ],
    controllers: [UsuarioController],
    providers: [CreateUsuarioUseCase ,BuscarUsuarioUseCase,                                            //Aqui hay que importar los usecase porque si no no los reconoce 
      {
        provide: 'IUsuarioRepository',
        useClass: UsuarioRepository,
    },],
})
export class UsuarioModule {}