import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitaController } from '../cita.controller';
import { CreateCitaUseCase } from 'src/application/use-cases/create-cita.use-case';
import { CitaSchema } from 'src/domain/schemas/cita.schema';
import { CitaRepository } from 'src/infrastructure/persistence/cita.repository';
import { ObtenerHorasSemanaCitaUseCase } from 'src/application/use-cases/obtener-horas-semana-cita.use-case';

import { DepartamentoModule } from 'src/infrastructure/adapters/controllers/departamento/departamento.module';
import { TecnicoModule } from 'src/infrastructure/adapters/controllers/tecnico/tecnico.module';

@Module({
  imports: [
    DepartamentoModule,  // Ahora exporta IDepartamentoRepository
    TecnicoModule,       // Exporta ITecnicoRepository
    MongooseModule.forFeature([{ name: 'Cita', schema: CitaSchema }]),
  ],
  controllers: [CitaController],
  providers: [
    CreateCitaUseCase,
    ObtenerHorasSemanaCitaUseCase,
    {
      provide: 'ICitaRepository',
      useClass: CitaRepository,
    },
  ],
})
export class CitaModule {}
