//TODO TECNICO MODULE 
import { Module } from '@nestjs/common';
import { TecnicoController } from '../tecnico.controller';
import { CreateTecnicoUseCase } from '../../../../application/use-cases/create-tecnico.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { TecnicoSchema } from '../../../../domain/schemas/tecnico.schema';
import { TecnicoRepository } from '../../../persistence/tecnico.repository';
import { BuscarTecnicoUseCase } from 'src/application/use-cases/buscar-tecnico.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tecnico', schema: TecnicoSchema }]),
  ],
  controllers: [TecnicoController],
  providers: [
    CreateTecnicoUseCase,
    BuscarTecnicoUseCase,
    {
      provide: 'ITecnicoRepository',
      useClass: TecnicoRepository,
    },
  ],
  exports: [
    MongooseModule,
    'ITecnicoRepository',
  ],
})
export class TecnicoModule {}
