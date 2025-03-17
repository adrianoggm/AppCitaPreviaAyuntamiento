import { Controller,Post,Body,Get,Query } from "@nestjs/common";
import { CreateTipoTramiteDto } from "../../../domain/dto/create-tipotramite.dto";
import { CreateTipoTramiteUseCase } from "src/application/use-cases/create-tipotramite.use-case";
import { GetTipoTramiteNombresUseCase } from "src/application/use-cases/buscar-tipotramite-nombres.use-case";
import { TipoTramite } from "src/domain/entities/tipotramite.entity";

    //TODO AÑADIR  + RUTAS
@Controller("api/tipotipotramite")
export class TipoTramiteController{
    constructor (
        private readonly  createTipoTramiteUseCase: CreateTipoTramiteUseCase,
        private readonly getTipoTramiteNombresUseCase: GetTipoTramiteNombresUseCase
    ){}

    @Post()
    async create(@Body() createTipoTramiteDto: CreateTipoTramiteDto):Promise<TipoTramite>{
        return await this.createTipoTramiteUseCase.execute(createTipoTramiteDto);
    }
    @Get('nombres')
  async getNombres(): Promise<string[]> {
    return await this.getTipoTramiteNombresUseCase.execute();
  }
}