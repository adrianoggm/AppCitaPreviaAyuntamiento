import { Controller,Post,Body,Get,  Query } from "@nestjs/common";
import { CreateDepartamentoDto } from "src/domain/dto/create-departamento.dto";
import { Departamento} from "src/domain/entities/departamento.entity";
import { CreateDepartamentoUseCase } from "src/application/use-cases/create-departamento.use-case"
import { BuscarDepartamentoUseCase } from "src/application/use-cases/buscar-departamento.use-case"
import {BuscarDepartamentobyTipoTramiteUseCase}  from "src/application/use-cases/buscar-departamento-tipotramite.use-case"
    //TODO AÑADIR  + RUTAS de usuario para añadir borrar editar buscar algun usuario .

@Controller("api/departamento")
export class DepartamentoController{
    constructor (
        private readonly  createDepartamentoUseCase: CreateDepartamentoUseCase,
        private readonly  buscarDepartamentoUseCase:  BuscarDepartamentoUseCase,
        private readonly  BuscarDepartamentobyTipoTramiteUseCase:  BuscarDepartamentobyTipoTramiteUseCase
    ){}

    @Post()
    async create(@Body() createDepartamentoDto: CreateDepartamentoDto):Promise<Departamento>{
        return await this.createDepartamentoUseCase.execute(createDepartamentoDto);
    }
    //Busco por nombre de usario
    @Get('/buscar')
    async findDepartamentoByName(@Query('nombre') nombre:string): Promise <Departamento|null>{
        return await this.buscarDepartamentoUseCase.execute(nombre);
    }
    @Get('/buscar-por-tipo')
    async findDepartamentoByTipoTramite(@Query('tipoTramite') tipoTramite:string): Promise <Departamento[]>{
        console.log("tramite ", tipoTramite);
        return await this.BuscarDepartamentobyTipoTramiteUseCase.execute(tipoTramite);
    }

    
    /*@Get()   //Busco los que pertenezcan a mismo departamento
    async findAllUsuarios(@Query("Departamento") nombreusuario:string): Promise <Usuario[]|null>{
        return await this.buscarUsuarioUseCase.execute(nombreusuario);
    }*/
}