import { Controller,Post,Body,Get,Query } from "@nestjs/common";
import { CreateTramiteDto } from "../../../domain/dto/create-tramite.dto";
import { CreateTramiteUseCase } from "src/application/use-cases/create-tramite.use-case";
import { Tramite } from "src/domain/entities/tramite.entity";
import { BuscarTramiteUseCase } from "src/application/use-cases/buscar-tramite.use-case";

    //TODO AÑADIR  + RUTAS
@Controller("api/tramites")
export class TramiteController{
    constructor (
        private readonly  createTramiteUseCase: CreateTramiteUseCase,
        private readonly findTramitesUseCase:   BuscarTramiteUseCase,
    ){}

    @Post()
    async create(@Body() createTramiteDto: CreateTramiteDto):Promise<Tramite>{
        return await this.createTramiteUseCase.execute(createTramiteDto);
    }
    @Get()
    async find(
      @Query('tipoTramite') tipoTramite?: string,
      @Query('idusuario') idusuario?: string,
      @Query('idtecnico') idtecnico?: string,
    ): Promise<Tramite[]> {
      return await this.findTramitesUseCase.execute({ tipoTramite, idusuario, idtecnico });
    }
}