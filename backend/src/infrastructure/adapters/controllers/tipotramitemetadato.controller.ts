import { Controller,Post,Body,Get,Query } from "@nestjs/common";
import { CreateTipoTramiteMetadatoDto } from "../../../domain/dto/create-tipotramitemetadato.dto";
import { CreateTipoTramiteMetadatoUseCase } from "src/application/use-cases/create-tipotramitemetadato.use-case";
import { TipoTramiteMetadato } from "src/domain/entities/tipotramitemetadato.entity";

    //TODO AÑADIR  + RUTAS
@Controller("api/tipotramitemetadato")
export class TipoTramiteMetadatoController{
    constructor (
        private readonly  createTipoTramiteMetadatoUseCase: CreateTipoTramiteMetadatoUseCase,
    ){}

    @Post()
    async create(@Body() createTipoTramiteMetadatoDto: CreateTipoTramiteMetadatoDto):Promise<TipoTramiteMetadato>{
        console.log("createTipoTramiteMetadatoDto",createTipoTramiteMetadatoDto);
        return await this.createTipoTramiteMetadatoUseCase.execute(createTipoTramiteMetadatoDto);
    }

}