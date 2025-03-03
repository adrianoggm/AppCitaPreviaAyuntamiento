
import{ Module } from '@nestjs/common';
import { TramiteController } from '../tramite.controller';
import { CreateTramiteUseCase  } from '../../../../application/use-cases/create-tramite.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { TramiteSchema } from '../../../../domain/schemas/tramite.schema';
import { TramiteRepository  } from '../../../persistence/tramite.repository';
import { BuscarTramiteUseCase } from 'src/application/use-cases/buscar-tramite.use-case';

//TODO falta por añadir la funcionalidad del  Repositorio
@Module({
    imports: [
      MongooseModule.forFeature([{ name:'Tramite',schema: TramiteSchema }]),
    ],
    controllers: [TramiteController],
    providers: [CreateTramiteUseCase , BuscarTramiteUseCase,
      {
        provide: 'ITramiteRepository',
        useClass: TramiteRepository,
    },],
})
export class TramiteModule {}