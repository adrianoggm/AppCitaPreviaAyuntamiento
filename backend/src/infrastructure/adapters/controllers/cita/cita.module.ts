import{ Module } from '@nestjs/common';
import { CitaController } from '../cita.controller';
import { CreateCitaUseCase  } from '../../../../application/use-cases/create-cita.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { CitaSchema } from '../../../../domain/schemas/cita.schema';
import { CitaRepository  } from '../../../persistence/cita.repository';
//import { BuscarCitaUseCase } from 'src/application/use-cases/buscar-cita.use-case';
//import { BuscarCitabyTipoTramiteUseCase } from 'src/application/use-cases/buscar-cita-tipotramite.use-case';
//TODO falta por añadir la funcionalidad del  Repositorio
@Module({
    imports: [
      MongooseModule.forFeature([{ name:'Cita',schema: CitaSchema }]),
    ],
    controllers: [CitaController],
    providers: [CreateCitaUseCase , //BuscarCitaUseCase,BuscarCitabyTipoTramiteUseCase,
      {
        provide: 'ICitaRepository',
        useClass: CitaRepository,
    },],
})
export class CitaModule {}