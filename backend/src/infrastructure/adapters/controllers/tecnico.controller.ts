import { Controller,Post,Body,Get,  Query } from "@nestjs/common";
import { CreateTecnicoDto } from "src/domain/dto/create-tecnico.dto";
import { Tecnico} from "src/domain/entities/tecnico.entity";
import { CreateTecnicoUseCase } from "src/application/use-cases/create-tecnico.use-case"
import { BuscarTecnicoUseCase } from "src/application/use-cases/buscar-tecnico.use-case"

    //TODO AÑADIR  + RUTAS de usuario para añadir borrar editar buscar algun usuario .

@Controller("api/tecnico")
export class TecnicoController{
    constructor (
        private readonly  createTecnicoUseCase: CreateTecnicoUseCase,
        private readonly  buscarTecnicoUseCase:  BuscarTecnicoUseCase
    ){}

    @Post()
    async create(@Body() createTecnicoDto: CreateTecnicoDto):Promise<Tecnico>{
        return await this.createTecnicoUseCase.execute(createTecnicoDto);
    }
    //Busco por nombre de usario
    @Get()
    async findUsuarioByName(@Query('nombretecnico') nombretecnico:string): Promise <Tecnico|null>{
        return await this.buscarTecnicoUseCase.execute(nombretecnico);
    }
    /*@Get()   //Busco los que pertenezcan a mismo departamento
    async findAllUsuarios(@Query("Departamento") nombreusuario:string): Promise <Usuario[]|null>{
        return await this.buscarUsuarioUseCase.execute(nombreusuario);
    }*/
}