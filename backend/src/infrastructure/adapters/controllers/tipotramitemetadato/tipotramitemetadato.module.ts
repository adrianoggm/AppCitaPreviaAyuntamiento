
import{ Module } from '@nestjs/common';
import { TipoTramiteMetadatoController } from '../tipotramitemetadato.controller';
import { CreateTipoTramiteMetadatoUseCase  } from '../../../../application/use-cases/create-tipotramitemetadato.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoTramiteMetadatoSchema } from '../../../../domain/schemas/tipotramitemetadato.schema';
import { TipoTramiteMetadatoRepository  } from '../../../persistence/tipotramitemetadato.repository';
import { BuscarTipoTramiteMetadatoUseCase } from "src/application/use-cases/buscar-tipotramitemetadato.use-case";
//TODO falta por añadir la funcionalidad del  Repositorio
@Module({
    imports: [
      MongooseModule.forFeature([{ name:'TipoTramiteMetadato',schema: TipoTramiteMetadatoSchema }]),
    ],
    controllers: [TipoTramiteMetadatoController],
    providers: [CreateTipoTramiteMetadatoUseCase ,BuscarTipoTramiteMetadatoUseCase,
      {
        provide: 'ITipoTramiteMetadatoRepository',
        useClass: TipoTramiteMetadatoRepository,
    },],
    exports: [
      MongooseModule,
      'ITipoTramiteMetadatoRepository',
    ],
})
export class TipoTramiteMetadatoModule {}