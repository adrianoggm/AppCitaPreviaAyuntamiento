
import{ Module } from '@nestjs/common';
import { TipoTramiteController } from '../tipotramite.controller';
import { CreateTipoTramiteUseCase  } from '../../../../application/use-cases/create-tipotramite.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoTramiteSchema } from '../../../../domain/schemas/tipotramite.schema';
import { TipoTramiteRepository  } from '../../../persistence/tipotramite.repository';
import { GetTipoTramiteNombresUseCase } from "src/application/use-cases/buscar-tipotramite-nombres.use-case";

//TODO falta por añadir la funcionalidad del  Repositorio
@Module({
    imports: [
      MongooseModule.forFeature([{ name:'TipoTramite',schema: TipoTramiteSchema }]),
    ],
    controllers: [TipoTramiteController],
    providers: [CreateTipoTramiteUseCase ,GetTipoTramiteNombresUseCase,
      {
        provide: 'ITipoTramiteRepository',
        useClass: TipoTramiteRepository,
    },],
    exports: [
      MongooseModule,
      'ITipoTramiteRepository',
    ],
})
export class TipoTramiteModule {}