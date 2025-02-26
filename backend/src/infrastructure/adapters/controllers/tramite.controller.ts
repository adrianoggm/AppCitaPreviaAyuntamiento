import { Controller,Post,Body } from "@nestjs/common";
import { CreateTramiteDto } from "../../../domain/dto/create-tramite.dto";
import { CreateTramiteUseCase } from "src/application/use-cases/create-tramite.use-case";
import { Tramite } from "src/domain/entities/tramite.entity";

    //TODO AÑADIR  + RUTAS
@Controller("api/tramites")
export class TramiteController{
    constructor (
        private readonly  createTramiteUseCase: CreateTramiteUseCase
    ){}

    @Post()
    async create(@Body() createTramiteDto: CreateTramiteDto):Promise<Tramite>{
        return await this.createTramiteUseCase.execute(createTramiteDto);
    }

}