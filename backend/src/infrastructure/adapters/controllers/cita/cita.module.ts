import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitaController } from '../cita.controller';
import { CreateCitaUseCase } from 'src/application/use-cases/create-cita.use-case';
import { CitaSchema } from 'src/domain/schemas/cita.schema';
import { CitaRepository } from 'src/infrastructure/persistence/cita.repository';
import { ObtenerHorasSemanaCitaUseCase } from 'src/application/use-cases/obtener-horas-semana-cita.use-case';

import { DepartamentoModule } from 'src/infrastructure/adapters/controllers/departamento/departamento.module';
import { TecnicoModule } from 'src/infrastructure/adapters/controllers/tecnico/tecnico.module';

import { TramiteModule } from 'src/infrastructure/adapters/controllers/tramite/tramite.module';
import { ObtenerDiasMesCitaUseCase } from 'src/application/use-cases/obtener-dias-mes-cita.use-case';

@Module({
  imports: [
    DepartamentoModule,  // Exporta IDepartamentoRepository
    TecnicoModule,       // Exporta ITecnicoRepository
    TramiteModule,       //Eporta TIramiteModule
    MongooseModule.forFeature([{ name: 'Cita', schema: CitaSchema }]),
  ],
  controllers: [CitaController],
  providers: [
    CreateCitaUseCase,
    ObtenerHorasSemanaCitaUseCase,
    ObtenerDiasMesCitaUseCase,
    {
      provide: 'ICitaRepository',
      useClass: CitaRepository,
    },
  ],
})
export class CitaModule {}
