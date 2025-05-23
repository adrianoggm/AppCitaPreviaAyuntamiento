import { Module } from '@nestjs/common';
import { DepartamentoController } from '../departamento.controller';
import { CreateDepartamentoUseCase } from '../../../../application/use-cases/create-departamento.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartamentoSchema } from '../../../../domain/schemas/departamento.schema';
import { DepartamentoRepository } from '../../../persistence/departamento.repository';
import { BuscarDepartamentoUseCase } from 'src/application/use-cases/buscar-departamento.use-case';
import { BuscarDepartamentobyTipoTramiteUseCase } from 'src/application/use-cases/buscar-departamento-tipotramite.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Departamento', schema: DepartamentoSchema }]),
  ],
  controllers: [DepartamentoController],
  providers: [
    CreateDepartamentoUseCase,
    BuscarDepartamentoUseCase,
    BuscarDepartamentobyTipoTramiteUseCase,
    {
      provide: 'IDepartamentoRepository',
      useClass: DepartamentoRepository,
    },
  ],
  exports: [
    MongooseModule,
    'IDepartamentoRepository',
  ],
})
export class DepartamentoModule {}
