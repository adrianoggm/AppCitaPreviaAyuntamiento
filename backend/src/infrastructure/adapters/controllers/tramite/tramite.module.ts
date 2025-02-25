
import{ Module } from '@nestjs/common';
import { TramiteController } from '../tramite.controller';
import { CreateTramiteUseCase  } from '../../../../application/use-cases/create-tramite.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { TramiteSchema } from '../../../persistence/tramite.schema';
import { TramiteRepository  } from '../../../persistence/tramite.repository';

@Module({
    imports: [
      MongooseModule.forFeature([{ name:'Tramite',schema: TramiteSchema }]),
    ],
    controllers: [TramiteController],
    providers: [CreateTramiteUseCase ],
})
export class TramiteModule {}